"use client";

import React, { useEffect, useState } from "react";
import Column from "@/components/Column";
import { DashboardTable } from "@/components/editorComponents/DashboardTable";
import { Submission } from "@/types";
import { Axios } from "@/lib/axios";
function Dashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSubmissions = async () => {
      const result = await Axios.get(
        // "http://bike-csecu.com:5000/api/editorial-manager/submission",
        "/editorial-manager/submission?assigned=false"
      );
      const d = await result.data;
      setLoading(false);
      setSubmissions(d as Submission[]);
    };

    getSubmissions();
  }, []);
  return (
    <Column className="flex-1">
      <DashboardTable
        data={submissions}
        label="New Submissions"
        subheading="This is the list of your previous submissions."
        loading={loading}
      />
    </Column>
  );
}

export default Dashboard;
