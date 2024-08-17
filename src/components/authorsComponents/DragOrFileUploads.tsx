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
import { Axios } from "@/lib/axios";

export interface Files
  extends Pick<
    EMFile,
    "file_id" | "file_name" | "file_size" | "file_type" | "file_url"
  > {
  file: File;
}

export default function DragOrFileUploads() {
  const [files, setFiles] = useState<Files[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [originalSubmissionId, setOriginalSubmissionId] = useState("");
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
        file_id: genRandomString(12, true),
        file_name: file.name,
        file_size: fileSizeKB,
        file_type: fileType ? fileType.toLowerCase() : "",
        file_url: "",
        file: file,
      };
    });
    const uniqueNewFiles = newFiles.filter(
      (newFile) =>
        !files.some(
          (existingFile) => existingFile.file_name === newFile.file_name
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
          file_id: genRandomString(12),
          file_name: file.name,
          file_size: fileSizeKB,
          file_type: fileType ? fileType.toLowerCase() : "",
          file_url: "",
          file: file,
        };
      });

      const uniqueNewFiles = newFiles.filter(
        (newFile) =>
          !files.some(
            (existingFile) => existingFile.file_name === newFile.file_name
          )
      );

      setFiles((prevFiles) => [...prevFiles, ...uniqueNewFiles]);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      const submission = {
        submission_id: genRandomString(12, false, true),
        initial_submission_id: originalSubmissionId || null,
        author_id: "23456781",
        status: "Pending",
        submission_date: new Date(),
        status_date: new Date(),
        paper_title: title,
        keywords: keywords,
      };

      await Axios.post(
        // "http://bike-csecu.com:5000/api/editorial-manager/submission/",
        "/editorial-manager/submission/",
        submission
      );

      const formData = new FormData();
      files.forEach((file, index) => formData.append("items", file.file));
      const response = await Axios.post(
        // "http://bike-csecu.com:5000/api/upload",
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        const data: any = response.data;
        let submissionFiles: EMFile[] = data.files.map((f: any): EMFile => {
          const { file, ...rest } = files.find(
            (file) => file.file_name === f.originalname
          )!;
          return {
            ...rest,
            submission_id: submission.submission_id,
            file_url: f.path,
          };
        });

        await Axios.post("/editorial-manager/file", {
          files: submissionFiles,
        });
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
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
              Original Submission Id
            </Label>
            <Input
              type="text"
              placeholder="Write your paper title"
              required
              value={originalSubmissionId}
              onChange={(e) => setOriginalSubmissionId(e.target.value)}
              maxLength={12}
            />
            <p className="text-sm mt-2 text-muted-foreground">
              If this is a resubmission, then provide the original submission
              id.
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
            <Button
              onClick={handleSubmit}
              disabled={!keywords || !title || submitting}
            >
              {/* Submit */}
              {submitting ? (
                <div className="animate-spin w-5 h-5 rounded-full border-t border-solid border-white" />
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
