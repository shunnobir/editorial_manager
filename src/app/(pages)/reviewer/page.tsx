import { redirect } from "next/navigation";
import React from "react";

function page() {
  redirect("/reviewer/dashboard");
}

export default page;
