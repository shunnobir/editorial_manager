"use client";

import Column from "@/components/Column";
import EMLogo from "@/components/EMLogo";
import Page from "@/components/Page";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const userRole = useUserRole();
  // if (role === "editor") {
  //   redirect("/editor/dashboard");
  // } else if (role === "reviewer") {
  //   redirect("/reviewer");
  // } else {
  //   redirect("/author");
  // }

  return (
    <Page className="items-center justify-center gap-4">
      <Button
        onClick={() => {
          userRole?.setRole("author");
          router.push("/author/dashboard");
        }}
      >
        Login as Author
      </Button>

      <Button
        onClick={() => {
          userRole?.setRole("editor");
          router.push("/editor/dashboard");
        }}
      >
        Login as Editor
      </Button>

      <Button
        onClick={() => {
          userRole?.setRole("reviewer");
          router.push("/reviewer/dashboard");
        }}
      >
        Login as Reviewer
      </Button>
    </Page>
  );
}
