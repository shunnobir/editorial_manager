import Link from "next/link";
import {  
  Files,FileClock,FileCheck2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Dashboard() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-4">
        <div className="grid gap-7 grid-cols-4">
          <Card x-chunk="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                Total Submissions
              </CardTitle>
              <Files className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">
                +2 submissions this year
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                Submissions Pending
              </CardTitle>
              <FileClock className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">05</div>
              <p className="text-xs text-muted-foreground">
                +3 submissions this year
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Accepted</CardTitle>
              <FileCheck2 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">03</div>
              <p className="text-xs text-muted-foreground">
                +1 accepted this year
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
