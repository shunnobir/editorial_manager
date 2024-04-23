import Link from "next/link";
import { Files, FileClock, FileCheck2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashCards() {
  const cards = [
    {
      title: "Total Submissions",
      middle: "10",
      bottom: "+2 submissions this year",
      Icon: Files,
    },
    {
      title: "Total Submissions",
      middle: "10",
      bottom: "+2 submissions this year",
      Icon: FileClock,
    },
    {
      title: "Total Submissions",
      middle: "10",
      bottom: "+2 submissions this year",
      Icon: FileCheck2,
    },
  ];
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-4">
        <div className="grid gap-7 grid-cols-4">
          {cards.map((card, index) => (
            <Card key={index}>
              {" "}
              {/* Added key prop for unique identification */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">
                  {card.title}
                </CardTitle>
                <card.Icon size={20} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{card.middle}</div>
                <p className="text-xs text-muted-foreground">{card.bottom}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
