"use client";

import React, { useEffect, useState } from "react";
import Column from "@/components/Column";
import { DashboardTable } from "@/components/reviewerComponents/DashboardTable";
import { Submission } from "@/types";
import useAuth from "@/hooks/useAuth";
import { Axios } from "@/lib/axios";

function Dashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    const getData = async () => {
      if (!auth?.user) return;
      const result = await Axios.get(
        // "http://bike-csecu.com:5000/api/editorial-manager/submission",
        `/editorial-manager/reviewer/${auth?.user?.teacher_id}/assigned`
      );
      const d = await result.data;
      setSubmissions(d.submissions as Submission[]);
      setLoading(false);
    };

    getData();
  }, [auth]);

  return (
    <Column className="flex-1">
      <DashboardTable
        data={submissions}
        label="Ongoing Reviews"
        subheading="This is the list of your ongoing review papers."
        loading={loading}
      />
    </Column>
  );
}

export default Dashboard;
