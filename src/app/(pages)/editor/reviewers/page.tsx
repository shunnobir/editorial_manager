"use client";

import React, { useEffect, useState } from "react";
import Column from "@/components/Column";
import { ReviewerTable } from "@/components/editorComponents/ReviewerTable";

function Reviewers() {
  const [data, setData] = useState([]);
  return (
    <Column className="flex-1">
      <ReviewerTable
      data={data}
      label="Reviewers"
      subheading="This is the list of proposal reviewers."/>
    </Column>
  );
}

export default Reviewers;
