"use client";

import Column from "@/components/Column";
import EMLogo from "@/components/EMLogo";
import Page from "@/components/Page";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("role");
  if (role === "editor") {
    redirect("/editor");
  } else if (role === "reviewer") {
    redirect("/reviewer");
  } else {
    redirect("/author");
  }

  return (
    <Page className="flex flex-col">
      <Column className="flex-1 w-full p-8 items-center justify-center gap-8">
        <EMLogo size={200} />
        <Text variant="primary" className="text-5xl uppercase font-semibold">
          Editorial <Text variant="muted">Manager</Text>
        </Text>
      </Column>
      <Column className="flex-1 items-center gap-2">
        <Button>Default me</Button>
        <Button variant="destructive">Destruct me</Button>
        <Button variant="ghost"> Ghost me</Button>
        <Button variant="link"> Link me</Button>
        <Button variant="outline"> Outline me</Button>
        <Button variant="secondary"> Secondary me</Button>
      </Column>
    </Page>
  );
}
