"use client";

import Column from "@/components/Column";
import Page from "@/components/Page";
import Row from "@/components/Row";
import Text from "@/components/Text";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

function Submission() {
  const searchParams = useSearchParams();

  const submission = useMemo(
    () => ({
      submission_id: "ASJ98KJ25",
      author_id: "ASJ98KJ23",
      author_name: "Dr. Rudra Pratap Deb Nath",
      status: "Accepted",
      submission_date: new Date(),
      paper_title: "A Review of Innovative Teaching Methods",
      revision_of: "ASJ98KJ23",
      status_date: new Date(),
      keywords:
        "Social Science, Teaching Methodology, E-Learning, Distant Learning, Problem Based Learning",
    }),
    []
  );

  const submissionType = useMemo(
    () => (submission.revision_of ? "Revised" : "Initial"),
    [submission]
  );

  return (
    <Page className="gap-[30px] flex-col">
      <Row className="h-fit gap-2.5">
        <Text className="text-3xl font-medium">Submission</Text>
        <Badge className="py-0.5 px-2 rounded-sm h-fit w-fit">
          {submissionType}
        </Badge>
      </Row>

      <Column className="gap-5">
        <Column className="gap-1">
          <Text variant="primary" className="text-sm">
            Paper Title
          </Text>
          <Text className="text-sm">{submission.paper_title}</Text>
        </Column>

        <Row className="gap-5">
          <Column className="gap-1 flex-1">
            <Text variant="primary" className="text-sm">
              Initial Submission ID
            </Text>
            <Text className="text-sm">{submission.revision_of}</Text>
          </Column>
          <Column className="gap-1 flex-1">
            <Text variant="primary" className="text-sm">
              Revision ID
            </Text>
            <Text className="text-sm">{submission.submission_id}</Text>
          </Column>
        </Row>

        <Row className="gap-5">
          <Column className="gap-1 flex-1">
            <Text variant="primary" className="text-sm">
              Author ID
            </Text>
            <Text className="text-sm">{submission.author_id}</Text>
          </Column>
          <Column className="gap-1 flex-1">
            <Text variant="primary" className="text-sm">
              Author Name
            </Text>
            <Text className="text-sm">{submission.author_name}</Text>
          </Column>
        </Row>

        <Row className="gap-5">
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
              {submission.status_date.toDateString()}
            </Text>
          </Column>
        </Row>

        <Column className="gap-1 flex-1">
          <Text variant="primary" className="text-sm">
            Status
          </Text>
          <Badge className="w-fit h-fit rounded-sm py-0.5 px-2">
            {submission.status}
          </Badge>
        </Column>
      </Column>
    </Page>
  );
}

export default Submission;
