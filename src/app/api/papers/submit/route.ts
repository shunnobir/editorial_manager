import { Submission } from "@/types.d";
import psql from "@/utils/database.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: Submission = await req.json();
  try {
    await psql`insert into EManager_Submission values (${body.submission_id},
                                                 ${body.initial_submission_id},
                                                 ${body.author_id},
                                                 ${body.status},
                                                 ${body.submission_date},
                                                 ${body.status_date},
                                                 ${body.paper_title},
                                                 ${body.keywords})`;
    await psql`insert into EManager_Submission_Status_History values (${body.submission_id},
                                                                ${body.status},
                                                                ${body.submission_date})`;

    return NextResponse.json({ status: "paper submitted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "internal server error" });
  }
}
