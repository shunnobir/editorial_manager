"use client";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import DragDataTable from "./DragDataTable";
import SubmissionSuccessPage from "./SubmissionSuccessPage";
import { EMFile, Submission, SubmissionStatus } from "@/types.d";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/utils/firebase.config";
import { genRandomString } from "@/lib/utils";

export interface Files {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  file: Blob;
}

export default function DragOrFileUploads() {
  const [files, setFiles] = useState<Files[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    const newFiles: Files[] = Array.from(fileList).map((file, index) => {
      const fileSizeKB = Math.round(file.size / 1024);
      const fileType = file.name.split(".").pop();
      return {
        id: `${files.length + index}`,
        fileName: file.name,
        fileSize: fileSizeKB,
        fileType: fileType ? fileType.toLowerCase() : "",
        file: file as Blob,
      };
    });
    const uniqueNewFiles = newFiles.filter(
      (newFile) =>
        !files.some(
          (existingFile) => existingFile.fileName === newFile.fileName
        )
    );

    setFiles((prevFiles) => [...prevFiles, ...uniqueNewFiles]);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = e.target.files;
      const newFiles = Array.from(fileList).map((file, index) => {
        const fileSizeKB = Math.round(file.size / 1024);
        const fileType = file.name.split(".").pop();

        return {
          id: `${files.length + index}`,
          fileName: file.name,
          fileSize: fileSizeKB,
          fileType: fileType ? fileType.toLowerCase() : "",
          file: file as Blob,
        };
      });

      const uniqueNewFiles = newFiles.filter(
        (newFile) =>
          !files.some(
            (existingFile) => existingFile.fileName === newFile.fileName
          )
      );

      setFiles((prevFiles) => [...prevFiles, ...uniqueNewFiles]);
    }
  };

  // BROKEN!!! BROKEN!! Do not use it!!
  const handleSubmit = async () => {
    setSubmitting(true);
    const submission_id = genRandomString(12);
    const submission: Submission = {
      submission_id: submission_id,
      author_id: "4c8dfa21-f9df-4461-b356-15df2c08b108",
      initial_submission_id: "",
      keywords: keywords,
      paper_title: title,
      status: SubmissionStatus.Submitted,
      submission_date: new Date(),
      status_date: new Date(),
    };
    fetch("/api/papers/submit", {
      method: "POST",
      body: JSON.stringify(submission),
      cache: "no-store",
    });
    files.forEach((file) => {
      // const storage = getStorage();
      const storageRef = ref(
        storage,
        file.fileName + new Date().getTime().toString()
      );

      const uploadTask = uploadBytesResumable(storageRef, file.file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            const f: EMFile = {
              file_id: genRandomString(12),
              file_name: file.fileName,
              file_size: file.fileSize,
              file_type: file.fileType,
              file_url: downloadURL,
              submission_id: submission_id,
            };
            fetch("/api/file/upload", {
              method: "POST",
              body: JSON.stringify(f),
              cache: "no-store",
            });
          });
        }
      );
    });

    setTimeout(() => {
      setSubmitting(false);
      setFiles([]);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="flex w-full flex-col">
      {!isSubmitted ? (
        <>
          <div
            className="flex  flex-col gap-4 bg-[#E0F2FE] rounded-lg"
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col text-center  justify-center items-center p-48 ">
              <h1 className="p-1">
                Drag and Drop your files
                <br />
                or
                <br />
              </h1>
              <Input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                id="fileInput"
                onChange={handleFileInputChange}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-primary bg-none cursor-pointer"
              >
                Choose Files
              </Button>
            </div>
          </div>
          {files.length > 0 && <DragDataTable files={files} />}
          <div className="mt-7">
            <Label className="font-semibold text-lg" htmlFor="">
              Paper Title<span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Write your paper title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={512}
            />
            <p className="text-sm mt-2 text-muted-foreground">
              Paper title should not exceed 512 characters.
            </p>
          </div>
          <div className="mt-7">
            <Label className="font-semibold text-lg" htmlFor="">
              Keywords<span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              placeholder="neural networks, artificial intelligence"
              required
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <p className="text-sm mt-2 text-muted-foreground">
              Keywords should be comma separated.
            </p>
          </div>
          <div className="mt-7">
            <Button onClick={() => {}} disabled={!keywords || !title}>
              {/* Submit */}
              {submitting ? (
                <div className="animate-spin w-5 h-4 rounded-full border border-solid border-white" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </>
      ) : (
        <SubmissionSuccessPage />
      )}
    </div>
  );
}
