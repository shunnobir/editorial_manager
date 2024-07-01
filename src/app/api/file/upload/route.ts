// import { NextApiRequest } from "next";
import { EMFile } from "@/types.d";
import psql from "@/utils/database.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: EMFile = await req.json();
  try {
    psql`insert into EManager_File values (${body.file_id}, 
                                           ${body.submission_id}, 
                                           ${body.file_size}, 
                                           ${body.file_url},
                                           ${body.file_name},
                                           ${body.file_type})`;

    return NextResponse.json({ status: "file uploaded" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "internal server error" });
  }
}
