"use client";

import Page from "@/components/Page";
import { ReviewDetailData, ReviewTable } from "@/components/ReviewsTable";
import { Axios } from "@/lib/axios";
import { notFound, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ReviewsPage() {
  const searchParams = useSearchParams();
  const submission_id = searchParams.get("submission_id");

  const [reviews, setReviews] = useState<ReviewDetailData[]>([]);
  const [loading, setLoading] = useState(false);

  if (submission_id === null) {
    notFound();
  }

  useEffect(() => {
    const getReviews = async () => {
      const result = await Axios.get(
        `/editorial-manager/submission/${submission_id}/reviews`
      );
      const d = await result.data;
      console.log(d);
      setLoading(false);
      setReviews(d.reviews as ReviewDetailData[]);
    };

    getReviews();
  }, [submission_id]);

  return (
    <Page className="gap-[30px] flex-col">
      <ReviewTable
        data={reviews}
        label="Reviews"
        subheading={`This is the list of reviews for the submission ${submission_id}.`}
        loading={loading}
      />
    </Page>
  );
}

export default ReviewsPage;
