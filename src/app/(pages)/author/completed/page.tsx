"use client";

import React, { useState, useEffect } from "react";
import Column from "@/components/Column";
import { DashDataTable } from "@/components/authorsComponents/DashDataTable";
import { Submission } from "@/types.d";
import { Axios } from "@/lib/axios";

function Completed() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await Axios.get(
        // "http://bike-csecu.com:5000/api/editorial-manager/submission?completed=true",
        "/editorial-manager/submission?completed=true"
      );
      const d = await result.data;
      setSubmissions(d as Submission[]);
      setLoading(false);
    };

    getData();
  }, []);
  return (
    <Column className="flex-1">
      <DashDataTable
        data={submissions}
        label="Completed"
        subheading="This is the list of your accepted proposals."
        loading={loading}
      />
    </Column>
  );
}

export default Completed;
