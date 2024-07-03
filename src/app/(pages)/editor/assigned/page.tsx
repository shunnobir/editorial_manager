"use client";

import React, { useEffect, useState } from "react";
import Column from "@/components/Column";
import { ReviewerTable } from "@/components/editorComponents/ReviewerTable";

function Assigned() {
  const [data, setData] = useState([]);
  return (
    <Column className="flex-1">
      <ReviewerTable
      data={data}
      label="Assigned Reviewers"
      subheading="This is the list of reviewers assigned for the paper."/>
    </Column>
  );
}

export default Assigned;
