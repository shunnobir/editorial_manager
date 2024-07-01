"use client";

import Column from "@/components/Column";
import Page from "@/components/Page";
import PaperStatusBadge from "@/components/PaperStatusBadge";
import Row from "@/components/Row";
import Text from "@/components/Text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Submission_E } from "@/types.d";
import { submissions } from "@/utils/submissions";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

function Submission({ params }: { params: { id: string } }) {
  const router = useRouter();

  const submission: Submission_E = useMemo(
    () =>
      submissions.find((s) =>
        s.submission_id
          ? s.submission_id === params.id
          : s.initial_submission_id === params.id
      )!,
    [params]
  );

  const submissionType = useMemo(
    () => (submission.submission_id ? "Revised" : "Initial"),
    [submission]
  );

  return (
    <Page className="gap-[30px] flex-col">
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
            Writer
          </Text>
        </Button>
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
              Initial Submission ID
            </Text>
            <Text className="text-sm">
              {submission.initial_submission_id || submission.submission_id}
            </Text>
          </Column>
          <Column className="gap-1 flex-1">
            <Text variant="primary" className="text-sm">
              Revision ID
            </Text>
            <Text className="text-sm">
              {submission.initial_submission_id
                ? submission.submission_id
                : "N/A"}
            </Text>
          </Column>
        </Row>

        <Row className="gap-5 max-w-[500px]">
          <Column className="gap-1 flex-1">
            <Text variant="primary" className="text-sm">
              Submission Date
            </Text>
            <Text className="text-sm">
              {submission.submission_date.toDateString()}
            </Text>
          </Column>
          <Column className="gap-1 flex-1">
            <Text variant="primary" className="text-sm">
              Status Date
            </Text>
            <Text className="text-sm">
              {submission.status_history[0].status_date.toDateString()}
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
    </Page>
  );
}

export default Submission;
