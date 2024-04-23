import React from "react";
import { SubmissionStatus } from "@/types.d";
import {
  CheckCircle2,
  FileCheck,
  FileCheck2,
  MinusCircle,
  XCircle,
} from "lucide-react";
import Text from "./Text";
import { Badge } from "./ui/badge";

function PaperStatusBadge({ status }: { status: SubmissionStatus }) {
  let icon;
  let bgColorClass;

  switch (status) {
    case SubmissionStatus.Pending:
    case SubmissionStatus.Submitted:
      icon = <MinusCircle size={16} />;
      bgColorClass = "bg-purple-600 hover:bg-purple-600";
      break;
    case SubmissionStatus.Assigned:
      icon = <FileCheck size={16} />;
      bgColorClass = "bg-blue-600 hover:bg-blue-600";
      break;
    case SubmissionStatus.Reviewed:
      icon = <FileCheck2 size={16} />;
      bgColorClass = "bg-cyan-600 hover:bg-cyan-600";
      break;
    case SubmissionStatus.Accepted:
      icon = <CheckCircle2 size={16} />;
      bgColorClass = "bg-emerald-600 hover:bg-emerald-600";
      break;
    case SubmissionStatus.Rejected:
      icon = <XCircle size={16} />;
      bgColorClass = "bg-red-600 hover:bg-red-600";
      break;
  }
  return (
    <Badge
      className={`gap-1 w-[120px] text-white justify-center ${bgColorClass} py-1.5 px-3 rounded-sm`}
    >
      {icon}
      {status}
    </Badge>
  );
}

export default PaperStatusBadge;
