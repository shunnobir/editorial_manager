"use client";

import React, { useEffect, useState } from "react";
import Column from "@/components/Column";
import { DashboardTable } from "@/components/editorComponents/DashboardTable";
import { Submission } from "@/types";
import { Axios } from "@/lib/axios";

function ReviewedPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSubmissions = async () => {
      const result = await Axios.get("/editorial-manager/submission/reviewed");
      const d = await result.data;
      setLoading(false);
      setSubmissions(d.reviewed as Submission[]);
    };

    getSubmissions();
  }, []);

  return (
    <Column className="flex-1">
      <DashboardTable
        data={submissions}
        label="Reviewed Submissions"
        subheading="This is the list of reviewed submissions."
        loading={loading}
      />
    </Column>
  );
}

export default ReviewedPage;
