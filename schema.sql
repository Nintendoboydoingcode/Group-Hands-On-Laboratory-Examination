-- =============================================
-- EVENT MANAGEMENT SYSTEM
-- Database Schema
-- SQL Server
-- =============================================
-- Run against an empty database, e.g.:
--   CREATE DATABASE EventManagement;  GO
--   USE EventManagement;              GO
SET NOCOUNT ON;
GO

-- =============================================
-- 1. Create Tables (dependency-safe order)
-- =============================================

CREATE TABLE dbo.EventCategories (
    CategoryID       INT IDENTITY(1,1) NOT NULL,
    CategoryName     NVARCHAR(50)      NOT NULL,
    Description      NVARCHAR(250)     NULL
);
GO

CREATE TABLE dbo.Venues (
    VenueID          INT IDENTITY(1,1) NOT NULL,
    VenueName        NVARCHAR(100)     NOT NULL,
    Address          NVARCHAR(200)     NOT NULL,
    Room             NVARCHAR(50)      NULL,
    Capacity         INT               NOT NULL   -- physical maximum of the venue
);
GO

CREATE TABLE dbo.AttendanceTypes (
    AttendanceTypeID INT IDENTITY(1,1) NOT NULL,
    TypeName         NVARCHAR(30)      NOT NULL
);
GO

CREATE TABLE dbo.Users (
    UserID             INT IDENTITY(1,1) NOT NULL,
    FirstName          NVARCHAR(60)      NOT NULL,
    LastName           NVARCHAR(60)      NOT NULL,
    Email              NVARCHAR(254)     NOT NULL,
    ContactNumber      VARCHAR(20)       NOT NULL,
    StudentID          VARCHAR(20)       NULL,
    OrganizationCourse NVARCHAR(100)     NULL,
    CreatedAt          DATETIME2(0)      NOT NULL
);
GO

CREATE TABLE dbo.Events (
    EventID          INT IDENTITY(1,1) NOT NULL,
    EventName        NVARCHAR(150)     NOT NULL,
    Description      NVARCHAR(1000)    NULL,
    CategoryID       INT               NOT NULL,
    VenueID          INT               NOT NULL,
    EventDate        DATE              NOT NULL,
    StartTime        TIME(0)           NOT NULL,
    EndTime          TIME(0)           NOT NULL,
    Capacity         INT               NOT NULL,  -- maximum registrations accepted
    CreatedAt        DATETIME2(0)      NOT NULL
);
GO

CREATE TABLE dbo.Registrations (
    RegistrationID    INT IDENTITY(1,1) NOT NULL,
    UserID            INT               NOT NULL,
    EventID           INT               NOT NULL,
    AttendanceTypeID  INT               NOT NULL,
    RegistrationDate  DATETIME2(0)      NOT NULL,
    RegistrationStatus NVARCHAR(20)     NOT NULL,
    DietaryRequirement NVARCHAR(50)     NULL,
    AdditionalNotes   NVARCHAR(500)     NULL
);
GO

-- =============================================
-- 2. Primary Keys
-- =============================================

ALTER TABLE dbo.EventCategories ADD CONSTRAINT PK_EventCategories PRIMARY KEY CLUSTERED (CategoryID);
ALTER TABLE dbo.Venues          ADD CONSTRAINT PK_Venues           PRIMARY KEY CLUSTERED (VenueID);
ALTER TABLE dbo.AttendanceTypes ADD CONSTRAINT PK_AttendanceTypes  PRIMARY KEY CLUSTERED (AttendanceTypeID);
ALTER TABLE dbo.Users           ADD CONSTRAINT PK_Users            PRIMARY KEY CLUSTERED (UserID);
ALTER TABLE dbo.Events          ADD CONSTRAINT PK_Events           PRIMARY KEY CLUSTERED (EventID);
ALTER TABLE dbo.Registrations   ADD CONSTRAINT PK_Registrations    PRIMARY KEY CLUSTERED (RegistrationID);
GO

-- =============================================
-- 3. Foreign Keys
-- Surrogate IDENTITY keys never change, so ON UPDATE is NO ACTION.
-- SQL Server has no RESTRICT keyword; NO ACTION blocks the delete the same way.
-- Nothing cascades: removing a user/event/lookup row that is still referenced
-- is rejected, so registrations can never be orphaned or silently destroyed.
-- =============================================

ALTER TABLE dbo.Events ADD CONSTRAINT FK_Events_EventCategories
    FOREIGN KEY (CategoryID) REFERENCES dbo.EventCategories (CategoryID)
    ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.Events ADD CONSTRAINT FK_Events_Venues
    FOREIGN KEY (VenueID) REFERENCES dbo.Venues (VenueID)
    ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.Registrations ADD CONSTRAINT FK_Registrations_Users
    FOREIGN KEY (UserID) REFERENCES dbo.Users (UserID)
    ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.Registrations ADD CONSTRAINT FK_Registrations_Events
    FOREIGN KEY (EventID) REFERENCES dbo.Events (EventID)
    ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.Registrations ADD CONSTRAINT FK_Registrations_AttendanceTypes
    FOREIGN KEY (AttendanceTypeID) REFERENCES dbo.AttendanceTypes (AttendanceTypeID)
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- =============================================
-- 4. CHECK Constraints
-- =============================================

ALTER TABLE dbo.Venues ADD CONSTRAINT CK_Venues_Capacity CHECK (Capacity > 0);

ALTER TABLE dbo.Events ADD CONSTRAINT CK_Events_Capacity  CHECK (Capacity > 0);
ALTER TABLE dbo.Events ADD CONSTRAINT CK_Events_TimeRange CHECK (EndTime > StartTime);

ALTER TABLE dbo.Users ADD CONSTRAINT CK_Users_FirstName     CHECK (LEN(LTRIM(RTRIM(FirstName))) > 0);
ALTER TABLE dbo.Users ADD CONSTRAINT CK_Users_LastName      CHECK (LEN(LTRIM(RTRIM(LastName))) > 0);
ALTER TABLE dbo.Users ADD CONSTRAINT CK_Users_Email         CHECK (Email LIKE '_%@_%._%' AND Email NOT LIKE '% %');
ALTER TABLE dbo.Users ADD CONSTRAINT CK_Users_ContactNumber CHECK (ContactNumber NOT LIKE '%[^0-9+ ()-]%' AND LEN(ContactNumber) >= 7);
ALTER TABLE dbo.Users ADD CONSTRAINT CK_Users_StudentID     CHECK (StudentID IS NULL OR LEN(LTRIM(RTRIM(StudentID))) > 0);

ALTER TABLE dbo.Registrations ADD CONSTRAINT CK_Registrations_Status
    CHECK (RegistrationStatus IN ('Pending', 'Confirmed', 'Cancelled'));
GO

-- =============================================
-- 5. UNIQUE Constraints
-- =============================================

ALTER TABLE dbo.EventCategories ADD CONSTRAINT UQ_EventCategories_Name   UNIQUE (CategoryName);
ALTER TABLE dbo.Venues          ADD CONSTRAINT UQ_Venues_Name_Room       UNIQUE (VenueName, Room);
ALTER TABLE dbo.AttendanceTypes ADD CONSTRAINT UQ_AttendanceTypes_Name   UNIQUE (TypeName);
ALTER TABLE dbo.Users           ADD CONSTRAINT UQ_Users_Email            UNIQUE (Email);

-- One registration per user per event
ALTER TABLE dbo.Registrations   ADD CONSTRAINT UQ_Registrations_User_Event UNIQUE (UserID, EventID);
GO

-- StudentID is optional. A plain UNIQUE constraint would allow only ONE NULL in
-- SQL Server, so uniqueness is enforced only on rows where a value is provided.
CREATE UNIQUE NONCLUSTERED INDEX UQ_Users_StudentID
    ON dbo.Users (StudentID)
    WHERE StudentID IS NOT NULL;
GO

-- =============================================
-- 6. DEFAULT Constraints
-- =============================================

ALTER TABLE dbo.Users          ADD CONSTRAINT DF_Users_CreatedAt                  DEFAULT SYSUTCDATETIME() FOR CreatedAt;
ALTER TABLE dbo.Events         ADD CONSTRAINT DF_Events_CreatedAt                 DEFAULT SYSUTCDATETIME() FOR CreatedAt;
ALTER TABLE dbo.Registrations  ADD CONSTRAINT DF_Registrations_RegistrationDate   DEFAULT SYSUTCDATETIME() FOR RegistrationDate;
ALTER TABLE dbo.Registrations  ADD CONSTRAINT DF_Registrations_Status             DEFAULT 'Pending' FOR RegistrationStatus;
GO

-- =============================================
-- 7. Non-clustered Indexes
-- (PKs and UNIQUE constraints already create their own indexes)
-- =============================================

-- Foreign-key columns
CREATE NONCLUSTERED INDEX IX_Events_CategoryID
    ON dbo.Events (CategoryID);

CREATE NONCLUSTERED INDEX IX_Events_VenueID
    ON dbo.Events (VenueID);

CREATE NONCLUSTERED INDEX IX_Registrations_UserID
    ON dbo.Registrations (UserID);

-- INCLUDE lets "count active registrations for an event" be answered from the index alone
CREATE NONCLUSTERED INDEX IX_Registrations_EventID
    ON dbo.Registrations (EventID)
    INCLUDE (RegistrationStatus);

CREATE NONCLUSTERED INDEX IX_Registrations_AttendanceTypeID
    ON dbo.Registrations (AttendanceTypeID);

-- Catalog browsing: upcoming events by date
CREATE NONCLUSTERED INDEX IX_Events_EventDate
    ON dbo.Events (EventDate);
GO

-- =============================================
-- 8. Reference Data (lookup values)
-- =============================================

INSERT INTO dbo.AttendanceTypes (TypeName) VALUES (N'In-Person'), (N'Online');
GO
