"use client";

import Column from "@/components/Column";
import FileUpload from "@/components/reviewerComponents/FileUpload";
import useAuth from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ReviewPage() {
  const auth = useAuth();
  const searchParams = useSearchParams();
  const { submission_id, paper_title } = {
    submission_id: searchParams.get("submission_id") || "",
    paper_title: searchParams.get("title") || "",
  };

  return (
    <Column className="flex-1">
      <FileUpload
        submission_id={submission_id}
        paper_title={paper_title}
        reviewer_id={auth!.user!.teacher_id}
      />
    </Column>
  );
}
