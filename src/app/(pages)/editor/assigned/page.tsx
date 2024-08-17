"use client";

import React, { useEffect, useState } from "react";
import Column from "@/components/Column";
import { ReviewerTable } from "@/components/editorComponents/ReviewerTable";
import { Submission } from "@/types";
import { DashboardTable } from "@/components/editorComponents/DashboardTable";
import { Axios } from "@/lib/axios";

function Assigned() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const result = await Axios.get(
        "/editorial-manager/submission?assigned=true"
      );
      const d = await result.data;
      setLoading(false);
      setSubmissions(d as Submission[]);
    };

    getData();
  }, []);
  return (
    <Column className="flex-1">
      <DashboardTable
        data={submissions}
        label="Assigned Reviewers"
        subheading="This is the list of reviewers assigned for the paper."
        loading={loading}
      />
    </Column>
  );
}

export default Assigned;
