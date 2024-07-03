"use client";

import React, { useEffect, useState } from "react";
import Column from "@/components/Column";
import { DashboardTable } from "@/components/reviewerComponents/DashboardTable";

function Dashboard() {
  const [data, setData] = useState([]);

  return (
    <Column className="flex-1">
      <DashboardTable data={data} label="Ongoing Reviews" subheading="This is the list of your ongoing review papers."/>
    </Column>
  );
}

export default Dashboard;
