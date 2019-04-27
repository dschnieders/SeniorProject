CREATE TABLE [Wellness_Presentations] (
  [tracking_ID] INT NOT NULL IDENTITY(1,1),
  [eventDate] DATETIME,
  PRIMARY KEY ([tracking_ID])
);
CREATE INDEX [FK] ON  [Wellness_Presentations] ([tracking_ID]);

CREATE TABLE [Preventative_Activities] (
  [prevAct_ID] INT NOT NULL IDENTITY (1,1),
  [Annual_Physical] INT,
  [Dental_Exam1] INT,
  [Dental_Exam2] INT,
  [Vision_Exam] INT,
  [Flu_Shot] INT,
  [Complete_Screening INT] INT,
  PRIMARY KEY ([prevAct_ID])
);

CREATE TABLE [Employees] (
  [empl_ID] INT NOT NULL IDENTITY (1,1),
  [tracking_ID] INT,
  [birth_date] DATETIME,
  [first_name] NVARCHAR(15),
  [last_name] NVARCHAR(15),
  [gender] INT,
  [hire_date] DATETIME,
  [admin] INT,
  [username] NVARCHAR (15),
  [password] NVARCHAR (15),
  PRIMARY KEY ([empl_ID])
);

CREATE INDEX [FK] ON  [Employees] ([tracking_ID]);

CREATE TABLE [Wellness_Goal] (
  [goal_ID] INT,
  [goal] NVARCHAR (25),
  PRIMARY KEY ([goal_ID])
);

CREATE TABLE [Wellness_Class] (
  [class_ID]  INT,
  [class_name] NVARCHAR (25),
  PRIMARY KEY ([class_ID])
);

CREATE TABLE [Department_Manager] (
  [dept_ID]  INT,
  [empl_ID] INT,
  [from_date] DATETIME,
  [to_date] DATETIME
);

CREATE INDEX [FK] ON  [Department_Manager] ([dept_ID], [empl_ID]);

CREATE TABLE [Yammer] (
  [tracking_ID] INT,
  [eventDate] DATETIME
);

CREATE INDEX [FK] ON  [Yammer] ([tracking_ID]);

CREATE TABLE [Workouts] (
  [tracking_ID] INT,
  [eventDate] DATETIME
);

CREATE INDEX [FK] ON  [Workouts] ([tracking_ID]);

CREATE TABLE [Bonus_Activities] (
  [bonus_ID] INT,
  [Volunteer] INT,
  [new_workout] INT,
  [donate_blood] INT,
  [401k_meeting ] INT,
  [benefits_meeting] INT,
  PRIMARY KEY ([bonus_ID])
);

CREATE TABLE [Wellness_Wednesday] (
  [tracking_ID] INT,
  [eventDate] DATETIME
);

CREATE INDEX [FK] ON  [Wellness_Wednesday] ([tracking_ID]);

CREATE TABLE [Department_Employee] (
  [empl_ID] INT,
  [dept_ID] INT,
  [from_date] DATETIME,
  [to_date] DATETIME
);

CREATE INDEX [FK] ON  [Department_Employee] ([empl_ID], [dept_ID]);

CREATE TABLE [Department] (
  [dept_ID] INT,
  [dept_name] NVARCHAR (25),
  PRIMARY KEY ([dept_ID])
);

CREATE TABLE [Job_Titles] (
  [empl_ID] INT,
  [title]  NVARCHAR (15),
  [from_date] DATETIME,
  [to_date] DATETIME
);

CREATE INDEX [FK] ON  [Job_Titles] ([empl_ID]);

CREATE TABLE [Goal_Meetings] (
  [tracking_ID] INT,
  [eventDate] DATETIME
);

CREATE INDEX [FK] ON  [Goal_Meetings] ([tracking_ID]);

CREATE TABLE [Employee_Tracking] (
  [tracking_ID] INT,
  [prevAct_ID] INT,
  [wellChall_ID] INT,
  [wellWed_ID] INT,
  [wellPres_ID] INT,
  [workout_ID] INT,
  [yammer_ID] INT,
  [class_ID] INT,
  [orgAct_ID] INT,
  [social_ID] INT,
  [goal_ID] INT,
  [goalMeet_ID] INT,
  [bonus_ID] INT,
  PRIMARY KEY ([tracking_ID])
);

CREATE INDEX [FK] ON  [Employee_Tracking] ([prevAct_ID], [wellChall_ID], [wellWed_ID], [wellPres_ID], [workout_ID], [yammer_ID], [class_ID], [orgAct_ID], [social_ID], [goal_ID], [goalMeet_ID], [bonus_ID]);

CREATE TABLE [Social_Group] (
  [social_ID] INT,
  [name]  NVARCHAR (25),
  PRIMARY KEY ([social_ID])
);

CREATE TABLE [Organized_Activity] (
  [orgAct_ID] INT,
  [name]  NVARCHAR(25),
  PRIMARY KEY ([orgAct_ID])
);

CREATE TABLE [Wellness_Challenges] (
  [tracking_ID] INT,
  [eventDate] DATETIME
);

CREATE INDEX [FK] ON  [Wellness_Challenges] ([tracking_ID]);
