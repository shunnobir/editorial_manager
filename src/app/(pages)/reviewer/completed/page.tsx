"use client";

import React, { useEffect, useState } from "react";
import Column from "@/components/Column";
import { DashboardTable } from "@/components/reviewerComponents/DashboardTable";
function Completed() {
  const [data, setData] = useState([]);

  return (
    <Column className="flex-1">
      <DashboardTable data={data} label="Completed Reviews" subheading="This is the list of your completed reviewed papers."/>
    </Column>
  );
}

export default Completed;
