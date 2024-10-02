import Page from "@/components/Page";
import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <Page className="items-center justify-center gap-4 flex-1">
      <Loader2 className="mr-2 h-10 w-10 animate-spin stroke-primary" />
    </Page>
  );
};

export default Loading;
