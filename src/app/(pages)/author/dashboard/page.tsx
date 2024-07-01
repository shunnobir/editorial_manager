"use client";

import Column from "@/components/Column";
import DashCards from "@/components/authorsComponents/DashCards";
import { DashDataTable } from "@/components/authorsComponents/DashDataTable";
import getSubmissions from "@/lib/getSubmissions";
import { Submission, Submission_E } from "@/types.d";
import { submissions } from "@/utils/submissions";
import React, { useEffect, useState } from "react";

function Dashboard() {
  // const data: Submission_E[] = submissions;

  // const data: Submission[] = (await getSubmissions()).map(
  //   (r) => r as Submission
  // );
  // const data = await getSubmissions();
  const [data, setData] = useState<Submission[]>([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetch("/api/papers", {
        method: "GET",
        cache: "no-store",
      });
      const d = await result.json();
      setData(d.result as Submission[]);
    };

    getData();
  }, []);

  return (
    <Column className="flex-1">
      <DashCards />
      <DashDataTable
        data={data}
        label="Submissions"
        subheading="This is the list of your previous submissions"
      />
    </Column>
  );
}

export default Dashboard;
