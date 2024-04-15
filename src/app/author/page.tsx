import { redirect } from "next/navigation";
import React from "react";

function page() {
  redirect("/author/dashboard");
}

export default page;
