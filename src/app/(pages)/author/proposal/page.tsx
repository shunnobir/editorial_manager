import Column from "@/components/Column";
import DragOrFileUploads from "@/components/authorsComponents/DragOrFileUploads";
import React from "react";

function Proposal() {
  return (
    <Column className="flex-1">
      <DragOrFileUploads/>
    </Column>
  );
}

export default Proposal;
