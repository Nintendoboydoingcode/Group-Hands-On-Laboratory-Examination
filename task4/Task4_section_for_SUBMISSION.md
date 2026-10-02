## Task 4: Shift-Left Testing, Security & Refactoring

### 4.1 Unit Test Generation

**Prompt used:**
```text
You are a Senior QA Engineer. Write xUnit unit tests in C# for a
RegistrationValidator class that (1) validates student emails must end with
@univ.edu.ph and (2) checks seat availability for an event. The class gets
data through an IEventRepository interface. Use Moq mock objects to isolate
the database. Cover valid, invalid, null/empty, and boundary cases. Do not
connect to a real database.
```

**Files:** `/backend/RegistrationValidator.cs`, `/backend.tests/RegistrationValidatorTests.cs`

**How to run:** `dotnet test`

### 4.2 Vulnerability Diagnosis

**Prompt used:**
```text
Act as a Application Security Reviewer. Diagnose the following C# method for
SQL injection risks and unmanaged resource/memory leaks. For each issue,
explain the risk, show an example attack, and describe the fix.

[paste the flawed GetUserRegistration method here]
```

**AI diagnosis (summary):**

| # | Issue | Risk | Fix |
|---|---|---|---|
| 1 | String concatenation in SQL query | SQL injection, e.g. input `' OR '1'='1` returns data for every user; `'; DROP TABLE Registrations;--` can destroy data | Parameterized query with `@Email` |
| 2 | `SqlConnection` never closed/disposed | Connection pool exhaustion; resource leak | `using` statements |
| 3 | `ExecuteScalar().ToString()` with no null check | `NullReferenceException` if no row found | Null-conditional `?.ToString()` |
| 4 | Hard-coded connection string with credentials | Secret leaked in source control | Inject from configuration / environment variable |
| 5 | `SELECT *` with `ExecuteScalar` | Unneeded data fetched | Select only the needed column |

### 4.3 Refactored Solution

Saved at `/backend/RegistrationService.cs` (parameterized query + `using` blocks + null handling + injected connection string).

### Verification notes (copy useful ones into the Task 5 log)
- _[Describe what the AI got wrong or what you changed, e.g. "AI output missed the null check on ExecuteScalar; added `?.ToString()`."]_
