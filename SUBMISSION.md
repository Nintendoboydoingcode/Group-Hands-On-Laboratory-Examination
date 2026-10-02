# SUBMISSION.md — Online Campus Event Management System

## Team Roster

| Member | Name | Assigned Role | Core Responsibilities |
|---|---|---|---|
| Member 1 | John Cyrel S Nazareno | Systems Architect & Prompt Lead | Task 1 + Task 5 |
| Member 2 | Marwan T Bawayan | Frontend Engineer | Task 2 |
| Member 3 |  | Database & Backend Engineer | Task 3 |


---

## Task 1: Requirements Analysis & Prompt Architecture

### 1.1 Exact Prompt Used (RCTC Framework)

```text
ROLE
You are a Lead Systems Architect with 15 years of experience designing web
systems for universities. You specialize in scoping small, realistic
prototypes that a student team can finish on time.

CONTEXT
A group of 3-4 fourth-year BSIT students has exactly 3 hours to build a
working prototype of an Online Campus Event Management System. The system
must let students view upcoming campus events and register for an event, and
let administrators view the list of registered attendees. The team is
beginner-level with generative AI tools. The prototype will use: HTML5/CSS/
vanilla JavaScript for the frontend, C# (ASP.NET Core Web API) for the
backend, and SQL Server for the database. Team roles are: Systems Architect,
Frontend Engineer, Database/Backend Engineer, and QA/Security Engineer.

TASK
Produce an overall system design that includes:
1. Functional requirements (by user type) and non-functional requirements.
2. A high-level architecture (layers/components and how they communicate).
3. The recommended tech stack with a one-line justification for each choice.
4. The main database entities and their relationships (overview only).
5. A list of REST API endpoints (method, path, purpose).
6. A recommended repository folder structure.
7. A 180-minute implementation timeline split across the four roles.
8. The top 3 risks and how to mitigate them.

CONSTRAINTS
- Do NOT use third-party state management libraries such as Redux.
- Do NOT propose microservices, Docker, Kubernetes, or any cloud deployment.
- Do NOT use paid services or tools that require long setup or accounts.
- Do NOT suggest heavy frontend frameworks (Angular, React, Vue); use
  vanilla JavaScript only.
- Use Semantic HTML5 and WCAG-friendly practices in the frontend design.
- All database access must use parameterized queries; the schema must be 3NF.
- Keep the scope to a minimal viable prototype that is achievable in 3 hours.
- Format the response in Markdown with headings and tables; max 700 words.
```

### 1.2 AI Output

> **Tool used:** Claude (Anthropic). Output below is recorded as generated.

# Online Campus Event Management System — System Design

## 1. Requirements

**Functional**

| User | Requirement |
|---|---|
| Student | View list of upcoming events (title, date, venue, available seats) |
| Student | Register for an event using name + school email |
| Student | See confirmation or error (full event, duplicate registration, invalid email) |
| Admin | View the list of registered attendees per event |

**Non-functional**
- Accessible (WCAG/POUR), semantic HTML5
- Secure: parameterized queries, input validation, no hard-coded secrets in final code
- Simple to run locally in under 5 minutes
- Responsive layout (mobile + desktop)

## 2. High-Level Architecture

A simple **3-tier monolith**:

```
Browser (HTML/CSS/JS)  -->  ASP.NET Core Web API  -->  SQL Server
   Presentation              Business + Data Access        Persistence
```

- **Presentation:** static pages using `fetch()` to call the API. UI state is kept in plain JS variables/DOM — no state library.
- **API layer:** Controllers → `RegistrationService` (validation + business rules) → data access with `SqlCommand` parameters.
- **Database:** single SQL Server database, 3NF schema.

## 3. Tech Stack

| Layer | Choice | Justification |
|---|---|---|
| Frontend | HTML5, CSS3, vanilla JS | No build step; easy to make accessible |
| Backend | ASP.NET Core Web API (C#) | Matches the team's C# security/testing tasks |
| Database | SQL Server (LocalDB/Express) | Supports FKs, CHECK constraints, non-clustered indexes |
| Testing | xUnit + Moq | Mock DB dependencies for validation unit tests |
| Version control | GitHub | Required deliverable |

## 4. Core Entities (overview)

- **Users** (UserId, FullName, Email, Role)
- **Events** (EventId, Title, Description, EventDate, Venue, Capacity)
- **Registrations** (RegistrationId, UserId → Users, EventId → Events, RegisteredAt)

Relationships: one User → many Registrations; one Event → many Registrations. A unique constraint on (UserId, EventId) prevents duplicates.

## 5. API Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/events` | List upcoming events with seats left |
| GET | `/api/events/{id}` | Event details |
| POST | `/api/registrations` | Register a student for an event |
| GET | `/api/admin/events/{id}/attendees` | Admin: list attendees for an event |

## 6. Repository Structure

```
/frontend        index.html, styles.css, app.js
/backend         Controllers/, Services/RegistrationService.cs
/backend.tests   RegistrationValidatorTests.cs
/database        schema.sql
SUBMISSION.md
README.md
```

## 7. 180-Minute Timeline

| Minutes | Architect | Frontend | Database/Backend | QA/Security |
|---|---|---|---|---|
| 0–30 | Task 1 prompt + design | Wireframe, set up `/frontend` | Draft entities | Review requirements |
| 30–75 | Review outputs | Build catalog + form | 3NF schema, ERD | Write unit tests (mocks) |
| 75–120 | Integrate API contract | Connect `fetch()` to API | DDL + indexes + API | Diagnose flawed code |
| 120–165 | Merge branches | Accessibility pass | Seed test data | Refactor to parameterized + `using` |
| 165–180 | Finish SUBMISSION.md, verification log | — | — | — |

## 8. Top Risks

| Risk | Mitigation |
|---|---|
| Scope creep (login, payments, emails) | Skip authentication; use a simple admin page for the prototype |
| Merge conflicts in one repo | One folder per member; use branches and small commits |
| AI output has bugs/security flaws | Peer review every AI output; log fixes in the Verification Table |

### 1.3 Manual Grounding Evaluation

> _Draft — Member 1 should read the AI output above, edit this to match your own judgment, and make sure the claims are true for your team._

The AI-generated architecture is realistic for a 3-hour prototype because it uses a simple three-tier monolith with only three database tables and four API endpoints, avoiding heavy infrastructure such as microservices or cloud hosting. The technology stack (vanilla JS, ASP.NET Core, SQL Server) matches the tasks in this exam, including the C# security refactoring and SQL schema work. The timeline is slightly optimistic, since integrating the frontend with the API and setting up a local SQL Server could take longer than planned, so we will reduce risk by skipping authentication and using seeded test data. Overall, the scope is achievable if each member works within their own folder and the team keeps to the minimal features.

---

## Task 2: AI-Assisted Frontend Development
_To be completed by Member 2._

## Task 3: Database Design & ERD Generation
_To be completed by Member 3. Embed the Mermaid.js ERD block here._

## Task 4: Shift-Left Testing, Security & Refactoring
_To be completed by Member 4 (or Members 1 & 3)._

## Task 5: Group Integration & Verification Report

### Setup Instructions
_To be completed._

### AI Disclosure Statement
_List every AI tool used (e.g., Claude) and how outputs were verified._

### Group Verification Log

| Task # | Identified AI Flaw / Limitation | Manual Correction Applied | Member Responsible |
|---|---|---|---|
| | | | |
| | | | |
| | | | |
