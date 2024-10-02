"use client";

import React, { useEffect, useState } from "react";
import Column from "@/components/Column";
import { DashboardTable } from "@/components/reviewerComponents/DashboardTable";
import { Axios } from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import { Submission } from "@/types";
function Reviewed() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    const getData = async () => {
      if (!auth?.user) return;
      const result = await Axios.get(
        `/editorial-manager/reviewer/${auth?.user?.teacher_id}/reviewed`
      );
      const d = await result.data;
      setSubmissions(d.reviewed as Submission[]);
      setLoading(false);
    };

    getData();
  }, [auth]);
  return (
    <Column className="flex-1">
      <DashboardTable
        loading={loading}
        data={submissions}
        label="Reviewed Papers"
        subheading="This is the list of papers you reviewed."
      />
    </Column>
  );
}

export default Reviewed;
