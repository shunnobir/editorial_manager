"use client";

import Column from "@/components/Column";
import Page from "@/components/Page";
import PaperStatusBadge from "@/components/PaperStatusBadge";
import Row from "@/components/Row";
import Text from "@/components/Text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  EMAttachment,
  EMFile,
  EMReview,
  ReviewDetail,
  SubmissionDetail,
} from "@/types.d";
import {
  notFound,
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import DragDataTable from "@/components/authorsComponents/DragDataTable";
import { Axios } from "@/lib/axios";
import { useUserRole } from "@/hooks/useUserRole";
import { FileCheck, PenLine } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import DragTable from "@/components/reviewerComponents/DragTable";

function ReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [review, setReview] = useState<ReviewDetail | null>(null);
  const [attachments, setAttachments] = useState<EMAttachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasReviews, setHasReviews] = useState(false);
  // const [review, setReview] = useState<EMReview[]>(
  //   []
  // ); /* only one review will be set for the reviewer */
  const role = useUserRole();
  const auth = useAuth();

  const submissionType = useMemo(
    () => (review?.initial_submission_id !== null ? "Revised" : "Original"),
    [review]
  );

  useEffect(() => {
    const getReview = async () => {
      const result = await Axios.get(
        // `http://bike-csecu.com:5000/api/editorial-manager/submission/${params.id}`,
        `/editorial-manager/submission/${searchParams.get(
          "submission_id"
        )!}/reviews/${params.id}`
      );
      const d: { submission: SubmissionDetail } = await result.data;
      setReview(d.submission);

      const f = await Axios.get(
        // `http://bike-csecu.com:5000/api/editorial-manager/file?submission_id=${params.id}`,
        `/editorial-manager/attachment?review_id=${params.id}`
      );
      const fs: { message: string; attachments: EMAttachment[] } = await f.data;
      setAttachments(fs.attachments);
      setLoading(false);
    };

    getReview();
  }, [params, role, auth, searchParams]);

  if (searchParams.get("submission_id") === null) {
    notFound();
  }

  if (loading || !review) {
    return (
      <Page className="gap-[30px] flex-col">
        <Row className="h-fit gap-2.5">
          <Text className="text-3xl font-medium">Review</Text>
        </Row>

        <Column className="gap-5">
          <Column className="gap-1">
            <Skeleton className="w-32 h-6 rounded-sm" />
            <Skeleton className="w-52 h-6 rounded-sm" />
          </Column>

          <Row className="gap-5 max-w-[500px]">
            <Column className="gap-1 flex-1">
              <Skeleton className="w-32 h-6 rounded-sm" />
              <Skeleton className="w-52 h-6 rounded-sm" />
            </Column>
            <Column className="gap-1 flex-1">
              <Skeleton className="w-32 h-6 rounded-sm" />
              <Skeleton className="w-52 h-6 rounded-sm" />
            </Column>
          </Row>

          <Row className="gap-5 max-w-[500px]">
            <Column className="gap-1 flex-1">
              <Skeleton className="w-32 h-6 rounded-sm" />
              <Skeleton className="w-52 h-6 rounded-sm" />
            </Column>
            <Column className="gap-1 flex-1">
              <Skeleton className="w-32 h-6 rounded-sm" />
              <Skeleton className="w-52 h-6 rounded-sm" />
            </Column>
          </Row>

          <Column className="gap-1 flex-1">
            <Skeleton className="w-32 h-6 rounded-sm" />
            <Skeleton className="w-52 h-6 rounded-sm" />
          </Column>

          <Column className="gap-1 flex-1">
            <Skeleton className="w-32 h-6 rounded-sm" />
            <Row className="gap-5 flex-wrap">
              {[1, 2, 3, 4, 5].map((_, index) => {
                return <Skeleton key={index} className="w-32 h-6 rounded-sm" />;
              })}
            </Row>
          </Column>
        </Column>
      </Page>
    );
  }

  const isReviewer = role!.role.toLowerCase() === "reviewer";
  return (
    <Page className="gap-[30px] flex-col">
      <Row className="h-fit gap-2.5">
        <Text className="text-3xl font-medium">Review</Text>
      </Row>

      <Column className="gap-5">
        <Column className="gap-1">
          <Text variant="primary" className="text-sm">
            Paper Title
          </Text>
          <Text className="text-sm">{review.paper_title}</Text>
        </Column>

        <Row className="gap-5 max-w-[500px]">
          <Column className="gap-1 flex-1">
            <Text variant="primary" className="text-sm">
              Original Submission ID
            </Text>
            <Link
              href={`/submissions/${
                review.initial_submission_id || review.submission_id
              }`}
            >
              <Text className="text-sm text-blue-500 underline">
                {review.initial_submission_id || review.submission_id}
              </Text>
            </Link>
          </Column>
          <Column className="gap-1 flex-1">
            <Text variant="primary" className="text-sm">
              Revision ID
            </Text>
            <Link
              href={
                review.initial_submission_id
                  ? `/submissions/${
                      review.initial_submission_id || review.submission_id
                    }`
                  : "#"
              }
            >
              <Text
                className={`text-sm ${
                  review.initial_submission_id ? "text-blue-500 underline" : ""
                }`}
              >
                {review.initial_submission_id ? review.submission_id : "N/A"}
              </Text>
            </Link>
          </Column>
        </Row>

        <Row className="gap-5 max-w-[500px]">
          <Column className="gap-1 flex-1">
            <Text variant="primary" className="text-sm">
              Submission Date
            </Text>
            <Text className="text-sm">
              {format(review.submission_date, "LLL dd, yyyy")}
            </Text>
          </Column>
          <Column className="gap-1 flex-1">
            <Text variant="primary" className="text-sm">
              Status Date
            </Text>
            <Text className="text-sm">
              {format(review.status_date, "LLL dd, yyyy")}
            </Text>
          </Column>
        </Row>

        <Column className="gap-1 flex-1">
          <Text variant="primary" className="text-sm">
            Status
          </Text>
          <PaperStatusBadge status={review.status} />
        </Column>

        <Column className="gap-1 flex-1">
          <Text variant="primary" className="text-sm">
            Keywords
          </Text>
          <Row className="gap-5 flex-wrap">
            {review.keywords.split(",").map((keyword, index) => {
              return (
                <Badge className="py-1.5 px-3 rounded-sm" key={index}>
                  {keyword}
                </Badge>
              );
            })}
          </Row>
        </Column>
      </Column>

      {/* There will be the list of attached files */}
      <DragTable
        attachments={attachments.map((f) => ({ ...f, file: undefined }))}
      />
    </Page>
  );
}

export default ReviewPage;
