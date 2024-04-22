"use client";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import DragDataTable from "./DragDataTable";
import SubmissionSuccessPage from "./SubmissionSuccessPage";

export interface Files {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
}

export default function DragOrFileUploads() {
  const [files, setFiles] = useState<Files[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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
        fileSize: `${fileSizeKB} KB`,
        fileType: fileType ? fileType.toLowerCase() : "",
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
      const newFiles: Files[] = Array.from(fileList).map((file, index) => {
        const fileSizeKB = Math.round(file.size / 1024);
        const fileType = file.name.split(".").pop();

        return {
          id: `${files.length + index}`,
          fileName: file.name,
          fileSize: `${fileSizeKB} KB`,
          fileType: fileType ? fileType.toLowerCase() : "",
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

  const handleSubmit = () => {
    setFiles([]);
    setIsSubmitted(true);
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
              Keywords<span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              placeholder="neural networks, artificial intelligence"
              required
            />
            <p className="text-sm mt-2 text-[#71717A]">Keywords should be comma separated.</p>
          </div>
          <div className="mt-7">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </>
      ) : (
        <SubmissionSuccessPage />
      )}
    </div>
  );
}