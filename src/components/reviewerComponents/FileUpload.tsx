"use client";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import DragTable from "./DragTable";
import SubmissionPage from "./SubmissionPage";

import { EMFile } from "@/types.d";
import { genRandomString } from "@/lib/utils";

export interface Files
  extends Pick<
    EMFile,
    "file_id" | "file_name" | "file_size" | "file_type" | "file_url"
  > {
  file: File;
}

export default function FileUpload() {
  const [files, setFiles] = useState<Files[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [comment, setComment] = useState("");

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
      const formData = new FormData();
      files.forEach((file, index) => formData.append("items", file.file));
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
          {files.length > 0 && <DragTable files={files} />}
          <div className="mt-7">
            <Label className="font-semibold text-lg" htmlFor="">
              Paper Related Comments
            </Label>
            <Input
              type="text"
              placeholder="Write your comments or suggestions here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="mt-7">
            <Button onClick={handleSubmit} disabled={submitting}>
              {/* Submit */}
              {!submitting && "Submit"}
            </Button>
          </div>
        </>
      ) : (
        <SubmissionPage />
      )}
    </div>
  );
}
