import { Submission } from "@/types.d";
import psql from "@/utils/database.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const result = await psql<Submission[]>`select * from EManager_Submission`;
  return NextResponse.json({ result });
}
