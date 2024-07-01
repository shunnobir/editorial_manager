import { EMFile, Submission, Submission_E } from "@/types.d";
import psql from "@/utils/database.config";

export default async function getSubmissions() {
  const result = await psql<Submission[]>`select * from EManager_Submission`;
  // const ret: Submission_E[] = result.map((res) => {
  //   const files = psql<EMFile[]>`select * from EManager_Submission_Status_History where submission_id = ${res.submission_id}`;
  //   return {
  //     ...res,
  //     status_history: files,
  //   }

  // })
  return result;
}
