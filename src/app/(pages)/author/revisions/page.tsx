"use client";

import React,{useState, useEffect} from "react";
import Column from "@/components/Column";
import { DashDataTable } from "@/components/authorsComponents/DashDataTable";
import { Submission } from "@/types.d";

function Revisions() {
  const [data, setData] = useState<Submission[]>([]);
  useEffect(() => {
    const getData = async () => {
      const result = await fetch("/api/papers", {
        method: "GET",
        cache: "no-store",
      });
      const d = await result.json();
      setData(d.result as Submission[]);
    };

    getData();
  }, []);
  return (
    <Column className="flex-1">
      <DashDataTable
        data={data}
        label="Revisions"
        subheading="This is the list of the revisions of your proposals."
      />
    </Column>
  );
}

export default Revisions;
