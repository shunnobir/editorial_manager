import Column from "@/components/Column";
import DashCards from "@/components/authorsComponents/DashCards";
import { DashDataTable } from "@/components/authorsComponents/DashDataTable";
import {
  Submission,
  SubmissionStatus,
  SubmissionStatusHistory,
  Submission_E,
} from "@/types.d";
import { submissions } from "@/utils/submissions";
import React from "react";

function Dashboard() {
  const data: Submission_E[] = submissions;

  return (
    <Column className="flex-1">
      <DashCards />
      <DashDataTable
        data={data}
        label="Submissions"
        subheading="This is the list of your previous submissions"
      />
    </Column>
  );
}

export default Dashboard;
