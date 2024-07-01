export interface User {
  user_id: string;
  profile_image_id: number;
  sign_id: number;
  parmanent_address_id: number;
  present_address_id: number;
  email: string;
  phone: number;
  user_first_name_bn: string;
  user_last_name_bn: string;
  user_first_name_en: string;
  user_last_name_en: string;
  gender: string;
  blood_group: string;
  religion: string;
  ethnicity: string;
  Nationality: string;
  dob: timestamp;
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
  initial_submission_id: string;
  author_id: typeof Pick<User, "user_id">;
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
