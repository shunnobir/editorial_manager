"use client";

import Column from "@/components/Column";
import Page from "@/components/Page";
import PaperStatusBadge from "@/components/PaperStatusBadge";
import Row from "@/components/Row";
import Text from "@/components/Text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EMFile, EMReview, SubmissionDetail } from "@/types.d";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import DragDataTable from "@/components/authorsComponents/DragDataTable";
import { Axios } from "@/lib/axios";
import { useUserRole } from "@/hooks/useUserRole";
import { FileCheck, PenLine } from "lucide-react";
import useAuth from "@/hooks/useAuth";

function SubmissionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const role = useUserRole();
  const auth = useAuth();

  const isReviewer = role!.role.toLowerCase() === "reviewer";
  const isAuthor = role!.role.toLowerCase() === "author";
  const isEditor = role!.role.toLowerCase() === "editor";

  const [submission, setSubmission] = useState<SubmissionDetail | null>(null);
  const [files, setFiles] = useState<EMFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasReviews, setHasReviews] = useState(false);
  const [reviews, setReviews] = useState<EMReview[]>(
    []
  ); /* only one review will be set for the reviewer */

  const canAuthorSeeReview = useMemo(() => {
    return (
      isAuthor && reviews.length === 2 && submission?.status === "Accepted"
    );
  }, [isAuthor, reviews.length, submission?.status]);

  const submissionType = useMemo(
    () => (submission?.initial_submission_id !== null ? "Revised" : "Original"),
    [submission]
  );

  useEffect(() => {
    const getSubmission = async () => {
      const result = await Axios.get(
        `/editorial-manager/submission/${params.id}`
      );
      const d: { submission: SubmissionDetail } = await result.data;
      setSubmission(d.submission);

      const f = await Axios.get(
        `/editorial-manager/file?submission_id=${params.id}`
      );
      const fs: { message: string; files: EMFile[] } = await f.data;
      setFiles(fs.files);
      setLoading(false);
    };

    const isReviewed = async () => {
      const result = await Axios.get(
        `/editorial-manager/submission/${params.id}/reviews`
      );
      const reviews = result.data.reviews;
      setHasReviews(
        role!.role.toLowerCase() === "author" && reviews.length === 2
      );
    };

    const getReview = async () => {
      const result = await Axios.get(
        `/editorial-manager/submission/${params.id}/reviews`
      );
      const reviews: EMReview[] = result.data.reviews;
      setReviews(
        reviews.filter(
          (review) => review.reviewer_id === auth!.user!.teacher_id
        )
      );
    };

    getSubmission();
    isReviewed();
    getReview();
  }, [params, role, auth]);

  if (loading || !submission) {
    return (
      <Page className="gap-[30px] flex-col">
        <Row className="flex-1 items-center justify-between">
          <Row className="h-fit gap-2.5">
            <Text className="text-3xl font-medium">Submission</Text>
            <Skeleton className="w-24 h-6 rounded-sm" />
            <Skeleton className="w-24 h-6 rounded-sm" />
          </Row>
          {role!.role.toLowerCase() === "reviewer" ? (
            <Skeleton className="w-24 h-6 rounded-sm" />
          ) : null}
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

  return (
    <Page className="gap-[30px] flex-col">
      <Row className="flex-1 items-center justify-between">
        <Row className="h-fit gap-2.5">
          <Text className="text-3xl font-medium">Submission</Text>
          <Badge className="py-0.5 px-2 rounded-sm h-fit w-fit">
            {submissionType}
          </Badge>
          <Button
            variant="outline"
            className="py-0.5 px-4 rounded-sm h-fit w-fit"
            onClick={() => router.push("#")}
          >
            <Text variant="primary" className="text-xs">
              See Author
            </Text>
          </Button>
        </Row>
        {isReviewer ? (
          reviews.length >= 1 &&
          reviews.find(
            (review) => review.reviewer_id === auth?.user?.teacher_id
          ) !== undefined ? (
            <Button
              className="gap-2"
              onClick={() =>
                router.push(
                  `/reviews/${
                    reviews.find(
                      (review) => review.reviewer_id === auth?.user?.teacher_id
                    )!.review_id
                  }?submission_id=${params.id}`
                )
              }
            >
              <FileCheck size={18} className="text-current" />
              Show Review
            </Button>
          ) : (
            <Button
              className="gap-2"
              onClick={() =>
                router.push(
                  `/reviewer/review?submission_id=${params.id}&title=${submission.paper_title}`
                )
              }
            >
              <PenLine size={18} className="text-current" />
              Review
            </Button>
          )
        ) : (isAuthor && canAuthorSeeReview) || isEditor ? (
          <Button
            className="gap-2"
            onClick={() => router.push(`/reviews?submission_id=${params.id}`)}
          >
            <FileCheck size={18} className="text-current" />
            Show Reviews
          </Button>
        ) : null}
      </Row>

      <Column className="gap-5">
        <Column className="gap-1">
          <Text variant="primary" className="text-sm">
            Paper Title
          </Text>
          <Text className="text-sm">{submission.paper_title}</Text>
        </Column>

        <Row className="gap-5 max-w-[500px]">
          <Column className="gap-1 flex-1">
            <Text variant="primary" className="text-sm">
              Original Submission ID
            </Text>
            <Link
              href={`/submissions/${
                submission.initial_submission_id || submission.submission_id
              }`}
            >
              <Text className="text-sm text-blue-500 underline">
                {submission.initial_submission_id || submission.submission_id}
              </Text>
            </Link>
          </Column>
          <Column className="gap-1 flex-1">
            <Text variant="primary" className="text-sm">
              Revision ID
            </Text>
            <Link
              href={
                submission.initial_submission_id
                  ? `/submissions/${
                      submission.initial_submission_id ||
                      submission.submission_id
                    }`
                  : "#"
              }
            >
              <Text
                className={`text-sm ${
                  submission.initial_submission_id
                    ? "text-blue-500 underline"
                    : ""
                }`}
              >
                {submission.initial_submission_id
                  ? submission.submission_id
                  : "N/A"}
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
              {format(submission.submission_date, "LLL dd, yyyy")}
            </Text>
          </Column>
          <Column className="gap-1 flex-1">
            <Text variant="primary" className="text-sm">
              Status Date
            </Text>
            <Text className="text-sm">
              {format(submission.status_date, "LLL dd, yyyy")}
            </Text>
          </Column>
        </Row>

        <Column className="gap-1 flex-1">
          <Text variant="primary" className="text-sm">
            Status
          </Text>
          <PaperStatusBadge status={submission.status} />
        </Column>

        <Column className="gap-1 flex-1">
          <Text variant="primary" className="text-sm">
            Keywords
          </Text>
          <Row className="gap-5 flex-wrap">
            {submission.keywords.split(",").map((keyword, index) => {
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
      <DragDataTable files={files.map((f) => ({ ...f, file: undefined }))} />
    </Page>
  );
}

export default SubmissionPage;
