import { redirect } from "next/navigation";
import React from "react";

function page() {
  redirect("/editor/dashboard");
}

export default page;
