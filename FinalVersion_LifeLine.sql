--create database LifeLine
--use LifeLine
create table Application_Admin(
	AA_ID int primary key identity,
	AA_UserName varchar(30),
	AA_Email varchar (60),
	AA_Password varchar(255),
);
go
create table Appointments(
	A_ID INT PRIMARY KEY IDENTITY,
	A_H_ID int,
	A_D_ID int,
	A_PatientName varchar(50),
	A_PatientDOB date,
	A_Date date,
	A_Time time,
	A_Mobile nvarchar(11),
	A_Email nvarchar(50),
	A_Type varchar(15),
	A_Reason varchar(255),
	FOREIGN KEY (A_H_ID) REFERENCES Hospital(H_ID),
	FOREIGN KEY (A_D_ID) REFERENCES Doctors(D_ID),
);
go
CREATE TABLE Patients (
    P_ID INT PRIMARY KEY IDENTITY,
	P_D_ID int,
    P_Name varchar(255),
    P_DOB DATE,
    P_Mobile nvarchar(11),
	P_Date date,
	P_Time time,
	P_A_Status varchar(50),
	P_Reason varchar(255),
	P_Email varchar(255),
	P_Password varchar(255), 
	FOREIGN KEY (P_D_ID) REFERENCES Doctors(D_ID),
);
go
create table Doctors(
	D_ID INT PRIMARY KEY IDENTITY,
	D_H_ID int,
	D_Name varchar(50),
    D_Email varchar(255),
    D_Password varchar(255), 
    D_Mobile nvarchar(11),
	D_Field varchar(50),
	D_AvailablityStatus varchar(15),
	FOREIGN KEY (D_H_ID) REFERENCES Hospital(H_ID),
);
go
create table H_Employee(
	HE_ID INT PRIMARY KEY IDENTITY,
	HE_H_ID int,
	HE_Name varchar(30),
	HE_Email varchar(50),
	HE_Password varchar(255),
	HE_Role varchar(15),
	FOREIGN KEY (HE_H_ID) REFERENCES Hospital(H_ID),
);
go
CREATE TABLE Hospital (
    H_ID INT PRIMARY KEY IDENTITY,
    H_Name varchar(255),
    H_Address varchar(255),
	H_Email varchar(255),
	H_Password varchar(255),
	HL_Latitude FLOAT,
    HL_Longitude FLOAT
);
go
CREATE TABLE Blood_Availability (
    BA_ID INT PRIMARY KEY IDENTITY,
    BA_H_ID INT,
    BA_BloodGroup varchar(15),
    BA_BottlesAvailable INT,
	BA_Date DATE,
	BA_Time time,
    FOREIGN KEY (BA_H_ID) REFERENCES Hospital(H_ID)
);
go
create table Doctor_Prescription(
	DP_ID INT PRIMARY KEY IDENTITY,
	DP_D_ID int,
	DP_P_ID int,
	DP_Date datetime,
	DP_Disease varchar(255),
	FOREIGN KEY (DP_D_ID) REFERENCES Doctors(D_ID),
	FOREIGN KEY (DP_P_ID) REFERENCES Patients(P_ID)
);
go
create table Feedback(
	F_ID INT PRIMARY KEY IDENTITY,
	F_D_ID int,
	F_P_ID int,
	F_Rating int, --stars in bw 1-5
	F_Comments nvarchar(255),
	FOREIGN KEY (F_D_ID) REFERENCES Doctors(D_ID),
	FOREIGN KEY (F_P_ID) REFERENCES Patients(P_ID)
);
go
create table Video_Consultation(
	VC_ID INT PRIMARY KEY IDENTITY,
	VC_P_ID int,
	VC_D_ID int,
	VC_Date date,
	VC_Time time,
	FOREIGN KEY (VC_D_ID) REFERENCES Doctors(D_ID),
	FOREIGN KEY (VC_P_ID) REFERENCES Patients(P_ID)
);
go
create table Prescription_Medications(
	PM_ID int primary key identity,
	PM_DP_ID int,
	PM_Medicine varchar(255),
	PM_Dosage varchar(255),
	PM_ScheduleTime time,
	PM_StartDate date,
	PM_EndDate date,
	FOREIGN KEY (PM_DP_ID) REFERENCES Doctor_Prescription(DP_ID),
);
go
create table Emergency_Contact(
	EC_ID int primary key identity,
	EC_H_ID int,
	EC_Number1 nvarchar(12),
	EC_Number2 nvarchar(12),
	FOREIGN KEY (EC_H_ID) REFERENCES Hospital(H_ID)
);
go
create table Medical_Portfolio(
	MP_ID int primary key identity,
	MP_P_ID int,
	MP_DP_ID int,
	MP_PM_ID int,
	FOREIGN KEY (MP_DP_ID) REFERENCES Doctor_Prescription(DP_ID),
	FOREIGN KEY (MP_P_ID) REFERENCES Patients(P_ID),
	FOREIGN KEY (MP_PM_ID) REFERENCES Prescription_Medications(PM_ID),
);
go