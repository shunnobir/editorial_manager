"use client";

import React, { useEffect, useState } from "react";
import Column from "@/components/Column";
import { DashboardTable } from "@/components/editorComponents/DashboardTable";
function Dashboard() {
  const [data, setData] = useState([]);

  return (
    <Column className="flex-1">
  
      <DashboardTable
        data={data}
        label="New Submissions"
        subheading="This is the list of your previous submissions."
      />
    </Column>
  );
}

export default Dashboard;
