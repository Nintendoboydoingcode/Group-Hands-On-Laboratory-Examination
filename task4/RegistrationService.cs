using System;
using System.Data;
using Microsoft.Data.SqlClient;

namespace CampusEvents.Backend
{
    public class RegistrationService
    {
        private readonly string _connectionString;

        // Connection string is injected (e.g., from appsettings.json or an
        // environment variable) instead of being hard-coded in the method.
        public RegistrationService(string connectionString)
        {
            _connectionString = connectionString
                ?? throw new ArgumentNullException(nameof(connectionString));
        }

        /// <summary>
        /// Returns the registration ID for the given email, or null if none exists.
        /// </summary>
        public string GetUserRegistration(string inputEmail)
        {
            if (string.IsNullOrWhiteSpace(inputEmail))
                throw new ArgumentException("Email is required.", nameof(inputEmail));

            // Fix 1: parameterized query (prevents SQL injection)
            const string sql =
                "SELECT TOP 1 RegistrationId FROM Registrations WHERE Email = @Email";

            // Fix 2: using statements guarantee Close/Dispose, even on exceptions
            using (var conn = new SqlConnection(_connectionString))
            using (var cmd = new SqlCommand(sql, conn))
            {
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 254).Value = inputEmail;

                conn.Open();
                object result = cmd.ExecuteScalar();

                // Fix 3: ExecuteScalar() returns null when no row matches;
                // the original .ToString() would throw NullReferenceException.
                return result?.ToString();
            }
        }
    }
}
