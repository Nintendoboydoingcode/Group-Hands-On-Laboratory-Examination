using System;

namespace CampusEvents.Backend
{
    // External dependency (database) hidden behind an interface so it can be mocked.
    public interface IEventRepository
    {
        int GetCapacity(int eventId);
        int GetRegisteredCount(int eventId);
    }

    public class RegistrationValidator
    {
        private const string AllowedDomain = "@univ.edu.ph";
        private readonly IEventRepository _repository;

        public RegistrationValidator(IEventRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        public bool IsValidStudentEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email)) return false;

            email = email.Trim();

            // exactly one '@', something before it, and the allowed domain after it
            int at = email.IndexOf('@');
            if (at <= 0 || at != email.LastIndexOf('@')) return false;

            return email.EndsWith(AllowedDomain, StringComparison.OrdinalIgnoreCase);
        }

        public bool HasAvailableSeats(int eventId)
        {
            int capacity = _repository.GetCapacity(eventId);
            int registered = _repository.GetRegisteredCount(eventId);
            return registered < capacity;
        }
    }
}
