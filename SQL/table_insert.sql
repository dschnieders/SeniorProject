-- Initialize information in the Employees table
INSERT INTO dbo.Employees (tracking_ID, birth_date, first_name, last_name, gender, hire_date, [admin], username, [password])
VALUES ('0', '1993-11-20', 'Dalton', 'Schnieders', '1','2019-1-2', '0', 'dschnieders', 'password'),
    ('1', '1993-7-8', 'Tanna', 'Terry', '0', '2019-3-11', '1', 'tterry', 'admin'),
    ('2', '1955-2-15', 'Rod', 'Young', '1', '1995-5-19', '0', 'ryoung', 'ceo'),
    ('3', '1994-2-21', 'Tyler', 'Jacobs', '1', '2018-1-2', '0', 'tjacobs', 'dolt');
SELECT * FROM dbo.Employees;

-- Initialize information in the Job Titles table
INSERT INTO dbo.Job_Titles (empl_ID, title, from_date, to_date)
VALUES ('0', 'IT Intern', '2019-1-2', '2019-5-15'),
    ('1', 'H&W Coordinator', '2019-3-11', '2019-5-15'),
    ('2', 'CEO', '2008-6-12', '2019-5-15'),
    ('3', 'Design Engineer', '2018-1-2', '2019-5-15');
SELECT * FROM dbo.Job_Titles;

-- Initialize information in the Department table
INSERT INTO dbo.Department (dept_ID, dept_name)
VALUES ('0', 'Admin'),
    ('1', 'Structural'),
    ('2', 'Electrical'),
    ('3', 'Mechanical'),
    ('4', 'Civil'),
    ('5', 'Marketing'),
    ('6', 'Accounting');
SELECT * FROM dbo.Department;

-- Initialize information in Department Employee table
INSERT INTO dbo.Department_Employee(empl_ID, dept_ID, from_date, to_date)
VALUES ('0', '0', '2019-1-2', '2019-5-15'),
    ('1', '0', '2019-3-11', '2019-5-15'),
    ('3', '0', '2008-6-12', '2019-5-15'),
    ('4', '1', '2018-1-2', '2019-5-15');
SELECT * FROM dbo.Department_Employee;

-- Initialize tracking data for users
INSERT INTO dbo.Employee_Tracking (tracking_ID, prevAct_ID, wellChall_ID, wellWed_ID, WellPres_ID, workout_ID, yammer_ID, class_ID, orgAct_ID, social_ID, goal_ID, goalMeet_ID, bonus_ID)
VALUES ('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'),
    ('1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'),
    ('2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2'),
    ('3', '3', '3', '3', '3', '3', '3', '3', '3', '3', '3', '3', '3');
SELECT * FROM dbo.Employee_Tracking;

-- Fix the name of the final column here
INSERT INTO dbo.Preventative_Activities (prevAct_ID, Annual_Physical, Dental_Exam1, Dental_Exam2, Vision_Exam, Flu_Shot, Complete_Screening)
VALUES ('0', '1', '1', '1', '1', '0', '0'),
    ('1', '1', '1', '1', '0', '1', '1'),
    ('2', '1', '1', '1', '1', '1', '1'),
    ('3', '0', '0', '0', '0', '0', '0');
SELECT * FROM dbo.Preventative_Activities;

INSERT INTO dbo.Wellness_Challenges(tracking_ID, eventDate)
VALUES ('1', '2019-4-15'),
    ('2', '2019-1-15'),
    ('2', '2019-2-15'),
    ('2', '2019-3-15'),
    ('2', '2019-4-15');
SELECT * FROM dbo.Wellness_Challenges;

INSERT INTO dbo.Wellness_Wednesday(tracking_ID, eventDate)
VALUES ('1', '2019-4-1'),
    ('2', '2019-1-1'),
    ('2', '2019-2-1'),
    ('2', '2019-3-1'),
    ('2', '2019-4-1');

-- There's a problem here
INSERT INTO dbo.Wellness_Presentations(tracking_ID, eventDate)
VALUES ('1', '2019-3-20'),
    ('1', '2019-4-20'),
    ('2', '2019-1-20'),
    ('2', '2019-2-20'),
    ('2', '2019-3-20'),
    ('2', '2019-4-20'),
    ('3', '2019-1-20'),
    ('3', '2019-2-20'),
    ('3', '2019-3-20'),
    ('3', '2019-4-20');
SELECT * FROM dbo.Wellness_Presentations;

INSERT INTO dbo.Workouts(tracking_ID, eventDate)
VALUES ('0', '2019-2-1'),
    ('0', '2019-2-3'),
    ('0', '2019-2-5'),
    ('0', '2019-2-9'),
    ('0', '2019-2-11'),
    ('0', '2019-2-13'),
    ('0', '2019-2-15'),
    ('0', '2019-2-17'),
    ('0', '2019-2-19'),
    ('0', '2019-2-21'),
    ('0', '2019-2-23'),
    ('0', '2019-2-25'),
    ('0', '2019-3-1'),
    ('0', '2019-3-3'),
    ('0', '2019-3-5'),
    ('0', '2019-3-9'),
    ('0', '2019-3-11'),
    ('0', '2019-3-13'),
    ('0', '2019-3-15'),
    ('0', '2019-3-17'),
    ('0', '2019-3-19'),
    ('0', '2019-3-21'),
    ('0', '2019-3-23'),
    ('0', '2019-3-25'),
    ('0', '2019-4-1'),
    ('0', '2019-4-3'),
    ('0', '2019-4-5'),
    ('0', '2019-4-9'),
    ('0', '2019-4-11'),
    ('0', '2019-4-13'),
    ('0', '2019-4-15'),
    ('0', '2019-4-17'),
    ('0', '2019-4-19'),
    ('0', '2019-4-21'),
    ('0', '2019-4-23'),
    ('0', '2019-4-25'),
    ('1', '2019-2-1'),
    ('1', '2019-2-3'),
    ('1', '2019-2-5'),
    ('1', '2019-2-9'),
    ('1', '2019-2-11'),
    ('1', '2019-2-13'),
    ('1', '2019-2-15'),
    ('1', '2019-2-17'),
    ('1', '2019-2-19'),
    ('1', '2019-2-21'),
    ('1', '2019-2-23'),
    ('1', '2019-2-25'),
    ('1', '2019-3-1'),
    ('1', '2019-3-3'),
    ('1', '2019-3-5'),
    ('1', '2019-3-9'),
    ('1', '2019-3-11'),
    ('1', '2019-3-13'),
    ('1', '2019-3-15'),
    ('1', '2019-3-17'),
    ('1', '2019-3-19'),
    ('1', '2019-3-21'),
    ('1', '2019-3-23'),
    ('1', '2019-3-25'),
    ('1', '2019-4-1'),
    ('1', '2019-4-3'),
    ('1', '2019-4-5'),
    ('1', '2019-4-9'),
    ('1', '2019-4-11'),
    ('1', '2019-4-13'),
    ('1', '2019-4-15'),
    ('1', '2019-4-17'),
    ('1', '2019-4-19'),
    ('1', '2019-4-21'),
    ('1', '2019-4-23'),
    ('1', '2019-4-25');
SELECT * FROM dbo.Workouts;

INSERT INTO dbo.Yammer(tracking_ID, eventDate)
VALUES ('1', '2019-3-15'),
    ('1', '2019-3-20'),
    ('1', '2019-3-23'),
    ('1', '2019-4-1'),
    ('2', '2019-1-1'),
    ('3', '2019-2-1');
SELECT * FROM dbo.Yammer;

-- There's a problem here
INSERT INTO dbo.Wellness_Class(class_ID, class_name)
VALUES ('1', 'Yoga'),
    ('1', 'Boxing circuit'),
    ('2', 'Yoga');
SELECT * FROM dbo.Wellness_Class;

INSERT INTO dbo.Organized_Activity(orgAct_ID, [name])
VALUES ('1', 'RiverFest');
SELECT * FROM dbo.Organized_Activity;

INSERT INTO dbo.Social_Group (social_ID, [name])
VALUES ('3', 'Wichita Softball');
SELECT * FROM dbo.Social_Group;

