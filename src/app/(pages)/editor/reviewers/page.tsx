"use client";

import React, { useEffect, useState } from "react";
import Column from "@/components/Column";
import { ReviewerTable } from "@/components/editorComponents/ReviewerTable";
import { Reviewer } from "@/types.d";
import { Axios } from "@/lib/axios";

function Reviewers() {
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);

  useEffect(() => {
    const getData = async () => {
      const result = await Axios.get(
        // "http://bike-csecu.com:5000/api/editorial-manager/submission",
        "editorial-manager/reviewer"
      );
      const d = await result.data;
      setReviewers(d.reviewers as Reviewer[]);
    };

    getData();
  }, []);
  return (
    <Column className="flex-1">
      <ReviewerTable
        data={reviewers}
        label="Reviewers"
        subheading="This is the list of proposal reviewers."
        itemsPerPage={[3, 5, 10]}
        pageIndex={1}
      />
    </Column>
  );
}

export default Reviewers;
