import { SubmissionStatus, Submission_E } from "@/types.d";

export const submissions: Submission_E[] = [
  {
    // submission_id: "1",
    initial_submission_id: "",
    submission_id: "ASJ98KJ23",
    paper_title: "A Review of Innovative Teaching Methods",
    submission_date: new Date("Feb 20, 2024"),
    status: SubmissionStatus.Accepted,
    author_id: "1",
    keywords:
      "Teaching Methodology, E-Learning, Social Science, Distant Learning, Problem Based Learning",
    status_history: [
      // sorted in descending order by status_date
      {
        submission_id: "ASJ98KJ23",
        status: SubmissionStatus.Accepted,
        status_date: new Date("March 05, 2024"),
      },
      {
        submission_id: "ASJ98KJ23",
        status: SubmissionStatus.Reviewed,
        status_date: new Date("Feb 29, 2024"),
      },
      {
        submission_id: "ASJ98KJ23",
        status: SubmissionStatus.Assigned,
        status_date: new Date("Feb 21, 2024"),
      },
      {
        submission_id: "ASJ98KJ23",
        status: SubmissionStatus.Submitted,
        status_date: new Date("Feb 20, 2024"),
      },
    ],
  },
  {
    // submission_id: "1",
    submission_id: "POL329KJ",
    initial_submission_id: "ASJ98KJ23",
    paper_title: "A Review of Innovative Teaching Methods",
    submission_date: new Date("Feb 20, 2024"),
    status: SubmissionStatus.Rejected,
    author_id: "1",
    keywords:
      "Teaching Methodology, E-Learning, Social Science, Distant Learning, Problem Based Learning",
    status_history: [
      // sorted in descending order by status_date
      {
        submission_id: "POL329KJ",
        status: SubmissionStatus.Accepted,
        status_date: new Date("March 05, 2024"),
      },
      {
        submission_id: "POL329KJ",
        status: SubmissionStatus.Reviewed,
        status_date: new Date("Feb 29, 2024"),
      },
      {
        submission_id: "POL329KJ",
        status: SubmissionStatus.Assigned,
        status_date: new Date("Feb 21, 2024"),
      },
      {
        submission_id: "POL329KJ",
        status: SubmissionStatus.Submitted,
        status_date: new Date("Feb 20, 2024"),
      },
    ],
  },
  {
    // submission_id: "1",
    submission_id: "MN32HQWJ",
    initial_submission_id: "ASJ98KJ23",
    paper_title: "A Review of Innovative Teaching Methods",
    submission_date: new Date("Feb 20, 2024"),
    status: SubmissionStatus.Submitted,
    author_id: "1",
    keywords:
      "Teaching Methodology, E-Learning, Social Science, Distant Learning, Problem Based Learning",
    status_history: [
      // sorted in descending order by status_date
      {
        submission_id: "MN32HQWJ",
        status: SubmissionStatus.Accepted,
        status_date: new Date("March 05, 2024"),
      },
      {
        submission_id: "MN32HQWJ",
        status: SubmissionStatus.Reviewed,
        status_date: new Date("Feb 29, 2024"),
      },
      {
        submission_id: "MN32HQWJ",
        status: SubmissionStatus.Assigned,
        status_date: new Date("Feb 21, 2024"),
      },
      {
        submission_id: "MN32HQWJ",
        status: SubmissionStatus.Submitted,
        status_date: new Date("Feb 20, 2024"),
      },
    ],
  },
  {
    // submission_id: "1",
    submission_id: "YAJDH32HD",
    initial_submission_id: "ASJ98KJ23",
    paper_title: "A Review of Innovative Teaching Methods",
    submission_date: new Date("Feb 20, 2024"),
    status: SubmissionStatus.Assigned,
    author_id: "1",
    keywords:
      "Teaching Methodology, E-Learning, Social Science, Distant Learning, Problem Based Learning",
    status_history: [
      // sorted in descending order by status_date
      {
        submission_id: "YAJDH32HD",
        status: SubmissionStatus.Accepted,
        status_date: new Date("March 05, 2024"),
      },
      {
        submission_id: "YAJDH32HD",
        status: SubmissionStatus.Reviewed,
        status_date: new Date("Feb 29, 2024"),
      },
      {
        submission_id: "YAJDH32HD",
        status: SubmissionStatus.Assigned,
        status_date: new Date("Feb 21, 2024"),
      },
      {
        submission_id: "YAJDH32HD",
        status: SubmissionStatus.Submitted,
        status_date: new Date("Feb 20, 2024"),
      },
    ],
  },
  {
    // submission_id: "1",
    initial_submission_id: "",
    submission_id: "EWKJ32ASMNA",
    paper_title: "A Review of Innovative Teaching Methods",
    submission_date: new Date("Feb 20, 2024"),
    status: SubmissionStatus.Reviewed,
    author_id: "1",
    keywords:
      "Teaching Methodology, E-Learning, Social Science, Distant Learning, Problem Based Learning",
    status_history: [
      // sorted in descending order by status_date
      {
        submission_id: "EWKJ32ASMNA",
        status: SubmissionStatus.Accepted,
        status_date: new Date("March 05, 2024"),
      },
      {
        submission_id: "EWKJ32ASMNA",
        status: SubmissionStatus.Reviewed,
        status_date: new Date("Feb 29, 2024"),
      },
      {
        submission_id: "EWKJ32ASMNA",
        status: SubmissionStatus.Assigned,
        status_date: new Date("Feb 21, 2024"),
      },
      {
        submission_id: "EWKJ32ASMNA",
        status: SubmissionStatus.Submitted,
        status_date: new Date("Feb 20, 2024"),
      },
    ],
  },
];
