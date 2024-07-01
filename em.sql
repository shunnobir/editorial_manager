create table Users (
  user_id varchar(36) not null,
  constraint user_pk_con primary key (user_id)
);

create type RoleEnum as enum('Author', 'Editor', 'Reviewer');

create table Roles (
  role RoleEnum not null,
  user_id varchar(36) not null,
  constraint roles_fk_con foreign key (user_id) references Users(user_id),
  constraint role_pk_con primary key (role, user_id)
);

create type StatusEnum as enum('Pending', 'Submitted', 'Assigned', 'Reviewed', 'Accepted', 'Rejected');

create table EManager_Submission (
  submission_id varchar(12) not null,
  initial_submission_id varchar(12),
  author_id varchar(36) not null,
  status StatusEnum not null,
  submission_date date not null,
  status_date date not null,
  paper_title varchar(512) not null,
  keywords varchar(1024) not null,
  constraint em_sub_aid_fk_con foreign key (author_id) references Users(user_id),
  constraint em_sub_sid_fk_con foreign key (initial_submission_id) references EManager_Submission(submission_id),
  constraint em_sub_pk_con primary key (submission_id)
);

create table EManager_Submission_Status_History (
  submission_id varchar(12) not null,
  status StatusEnum not null,
  status_date date not null,
  constraint em_sub_stat_hist_fk_con foreign key (submission_id) references EManager_Submission(submission_id),
  constraint em_sub_stat_hist_pk_con primary key (submission_id, status)
);

create table EManager_File (
  file_id varchar(12) not null,
  submission_id varchar(12) not null,
  file_size int,
  file_url varchar(1024) not null,
  file_name varchar(512) not null,
  file_type varchar(50) not null,
  constraint em_file_fk_con foreign key (submission_id) references EManager_Submission(submission_id),
  constraint em_file_pk_con primary key (file_id)
);

insert into Users values ('4c8dfa21-f9df-4461-b356-15df2c08b108');
insert into Roles values ('Author', '4c8dfa21-f9df-4461-b356-15df2c08b108');