"use client";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import DragTable from "./DragTable";
import SubmissionPage from "./SubmissionPage";

import { EMAttachment, EMFile, EMReview } from "@/types.d";
import { genRandomString } from "@/lib/utils";
import { CloudUpload } from "lucide-react";
import { Axios } from "@/lib/axios";

export interface Attachments
  extends Pick<
    EMAttachment,
    | "attachment_id"
    | "attachment_name"
    | "attachment_size"
    | "attachment_type"
    | "attachment_url"
  > {
  file?: File;
}

export default function FileUpload({
  submission_id,
  paper_title,
  reviewer_id,
}: {
  submission_id: string;
  paper_title: string;
  reviewer_id: number;
}) {
  const [files, setFiles] = useState<Attachments[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    const newFiles: Attachments[] = Array.from(fileList).map((file, index) => {
      const fileSizeKB = Math.round(file.size / 1024);
      const fileType = file.name.split(".").pop();
      return {
        attachment_id: genRandomString(12, true),
        attachment_name: file.name,
        attachment_size: fileSizeKB,
        attachment_type: fileType ? fileType.toLowerCase() : "",
        attachment_url: "",
        file: file,
      };
    });
    const uniqueNewFiles = newFiles.filter(
      (newFile) =>
        !files.some(
          (existingFile) =>
            existingFile.attachment_name === newFile.attachment_name
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
          attachment_id: genRandomString(12),
          attachment_name: file.name,
          attachment_size: fileSizeKB,
          attachment_type: fileType ? fileType.toLowerCase() : "",
          attachment_url: "",
          file: file,
        };
      });

      const uniqueNewFiles = newFiles.filter(
        (newFile) =>
          !files.some(
            (existingFile) =>
              existingFile.attachment_name === newFile.attachment_name
          )
      );

      setFiles((prevFiles) => [...prevFiles, ...uniqueNewFiles]);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const review: EMReview = {
        review_id: genRandomString(12),
        submission_id: submission_id,
        reviewer_id: reviewer_id,
        review_date: new Date(),
      };

      await Axios.post(
        `/editorial-manager/submission/${submission_id}/review`,
        review
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
        console.log("entered");
        const data: any = response.data;
        let reviewAttachment: EMAttachment[] = data.files.map(
          (f: any): EMAttachment => {
            const { file, ...rest } = files.find(
              (attachment) => attachment.attachment_name === f.originalname
            )!;
            return {
              ...rest,
              review_id: review.review_id,
              attachment_url: f.path,
            };
          }
        );

        console.log(reviewAttachment);
        console.log("uploading attachments....");
        await Axios.post("/editorial-manager/attachment", {
          attachments: reviewAttachment,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitted(true);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col">
      {!isSubmitted ? (
        <>
          <div className="mb-7">
            {paper_title ? (
              <h2 className="text-2xl font-light">
                Submit your review for the paper{" "}
                <em className="font-normal">{paper_title}</em>
              </h2>
            ) : (
              <h2 className="text-2xl font-light">Submit your review</h2>
            )}
          </div>
          <div
            className="flex  flex-col gap-4 bg-[#E0F2FE] rounded-lg"
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col text-center  justify-center items-center p-40 ">
              <CloudUpload size={64} strokeWidth={1} />
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
          {files.length > 0 && <DragTable attachments={files} />}

          <div className="mt-7">
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? (
                <div className="animate-spin w-5 h-5 rounded-full border-t border-solid border-white" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </>
      ) : (
        <SubmissionPage />
      )}
    </div>
  );
}
