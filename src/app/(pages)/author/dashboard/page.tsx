"use client";

import Column from "@/components/Column";
import DashCards from "@/components/authorsComponents/DashCards";
import { DashDataTable } from "@/components/authorsComponents/DashDataTable";
import { Axios } from "@/lib/axios";
import { Submission } from "@/types.d";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await Axios.get(
        // "http://bike-csecu.com:5000/api/editorial-manager/submission",
        "/editorial-manager/submission"
      );
      const d = await result.data;
      setSubmissions(d as Submission[]);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <Column className="flex-1">
      <DashCards />
      <DashDataTable
        data={submissions}
        label="Submissions"
        subheading="This is the list of your previous submissions"
        loading={loading}
      />
    </Column>
  );
}

export default Dashboard;
