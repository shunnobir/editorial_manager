"use client";

import React, { useEffect, useState } from "react";
import Column from "@/components/Column";
import { DashboardTable } from "@/components/reviewerComponents/DashboardTable";
function Assigned() {
  const [data, setData] = useState([]);

  return (
    <Column className="flex-1">
      <DashboardTable
        loading={false}
        data={data}
        label="Assigned Papers"
        subheading="This is the list of papers assigned to you."
      />
    </Column>
  );
}

export default Assigned;
