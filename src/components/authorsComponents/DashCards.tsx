"use client";

import Link from "next/link";
import { Files, FileClock, FileCheck2, LucideProps } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForwardRefExoticComponent, useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Axios } from "@/lib/axios";

export default function DashCards({ author_id }: { author_id: number }) {
  const [cards, setCards] = useState<
    {
      title: string;
      middle: number | null;
      bottom: string | null;
      Icon: ForwardRefExoticComponent<LucideProps>;
    }[]
  >([
    {
      title: "Total Submissions",
      middle: null,
      bottom: null,
      Icon: Files,
    },
    {
      title: "Submissions Pending",
      middle: null,
      bottom: null,
      Icon: FileClock,
    },
    {
      title: "Accepted",
      middle: null,
      bottom: null,
      Icon: FileCheck2,
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      // total submissions
      let result = await Axios.get(
        `editorial-manager/count?author_id=${author_id}`
      );
      let d = await result.data;
      setCards((prev) => {
        const n = [...prev];
        n[0].middle = d.count;
        return n;
      });

      result = await Axios.get(
        `editorial-manager/count?author_id=${author_id}&year=${new Date().getFullYear()}`
      );
      d = await result.data;
      setCards((prev) => {
        const n = [...prev];
        n[0].bottom = `${d.count > 0 ? "+" : ""}${
          d.count
        } submissions this year`;
        return n;
      });

      // pending submissions
      result = await Axios.get(
        `editorial-manager/count?author_id=${author_id}&pending=true`
      );
      d = await result.data;
      setCards((prev) => {
        const n = [...prev];
        n[1].middle = d.count;
        return n;
      });

      result = await Axios.get(
        `editorial-manager/count?author_id=${author_id}&pending=true&year=${new Date().getFullYear()}`
      );
      d = await result.data;
      setCards((prev) => {
        const n = [...prev];
        n[1].bottom = `${d.count > 0 ? "+" : ""}${d.count} pending this year`;
        return n;
      });

      // accepted submissions
      result = await Axios.get(
        `editorial-manager/count?author_id=${author_id}&accepted=true`
      );
      d = await result.data;
      setCards((prev) => {
        const n = [...prev];
        n[2].middle = d.count;
        return n;
      });

      result = await Axios.get(
        `editorial-manager/count?author_id=${author_id}&accepted=true&year=${new Date().getFullYear()}`
      );
      d = await result.data;
      setCards((prev) => {
        const n = [...prev];
        n[2].bottom = `${d.count > 0 ? "+" : ""}${d.count} accepted this year`;
        return n;
      });
    };

    getData();
  }, [author_id]);

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-4">
        <div className="grid gap-7 grid-cols-4">
          {cards.map((card, index) => (
            <Card key={index}>
              {/* Added key prop for unique identification */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">
                  {card.title}
                </CardTitle>
                <card.Icon size={20} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {card.middle !== null ? (
                  <div className="text-4xl font-bold">
                    {card.middle !== null && card.middle < 10
                      ? card.middle?.toString().padStart(2, "0")
                      : card.middle}
                  </div>
                ) : (
                  <Skeleton className="w-32 h-12" />
                )}
                {card.bottom ? (
                  <p className="text-xs text-muted-foreground">{card.bottom}</p>
                ) : (
                  <Skeleton className="w-56 h-4 mt-2" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
