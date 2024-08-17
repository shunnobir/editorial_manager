export interface User {
  address_id: number;
  blood_group: string | null;
  dob: Date;
  email: string;
  ethnicity: string | null;
  first_name: string;
  first_name_bn: string | null;
  gender: string | null;
  last_name: string;
  last_name_bn: string | null;
  nationality: string | null;
  password: string;
  phone: string | null;
  profile_image_id: number | null;
  religion: string | null;
  sign_id: number | null;
  user_id: string;
}

export interface Teacher {
  area_of_interest: string;
  department_id: number;
  designation: string;
  teacher_id: number;
  title: string;
  user_id: string;
}

export interface Role {
  user_id: string;
  end_date: Date | null;
  factor: string;
  role: string;
  start_date: Date;
}

export enum SubmissionStatus {
  Pending = "Pending",
  Submitted = "Submitted",
  Assigned = "Assigned",
  Reviewed = "Reviewed",
  Accepted = "Accepted",
  Rejected = "Rejected",
}

export interface Submission {
  submission_id: string;
  initial_submission_id: string | null;
  author_id: number;
  status: SubmissionStatus;
  submission_date: Date;
  status_date: Date;
  paper_title: string;
  keywords: string;
}

export interface SubmissionStatusHistory {
  submission_id: string;
  status_date: Date;
  status: SubmissionStatus;
}

export interface EMFile {
  file_id: string;
  submission_id: typeof Pick<Submission, "submission_id">;
  file_size: number;
  file_url: string;
  file_name: string;
  file_type: string;
}

export interface Submission_E extends Submission {
  status_history: SubmissionStatusHistory[];
}

export interface SubmissionDetail
  extends Submission,
    Teacher,
    Pick<User, "first_name" | "last_name"> {}

export interface Reviewer {
  user_id: string;
  teacher_id: number;
  designation: string;
  area_of_interest: string;
  department_name: string;
  title: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface AssignedReviewer extends Reviewer {
  submission_id: string;
}
