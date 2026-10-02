using CampusEvents.Backend;
using Moq;
using Xunit;

namespace CampusEvents.Tests
{
    public class RegistrationValidatorTests
    {
        private static RegistrationValidator CreateValidator(
            int capacity = 0, int registered = 0)
        {
            // Mock object isolates the validator from the real database
            var mockRepo = new Mock<IEventRepository>();
            mockRepo.Setup(r => r.GetCapacity(It.IsAny<int>())).Returns(capacity);
            mockRepo.Setup(r => r.GetRegisteredCount(It.IsAny<int>())).Returns(registered);
            return new RegistrationValidator(mockRepo.Object);
        }

        // ---------- Email domain validation ----------

        [Theory]
        [InlineData("juan.delacruz@univ.edu.ph")]
        [InlineData("MARIA@UNIV.EDU.PH")]
        [InlineData("  student1@univ.edu.ph  ")]
        public void IsValidStudentEmail_ValidDomain_ReturnsTrue(string email)
        {
            Assert.True(CreateValidator().IsValidStudentEmail(email));
        }

        [Theory]
        [InlineData("juan@gmail.com")]
        [InlineData("juan@univ.edu.ph.evil.com")]
        [InlineData("@univ.edu.ph")]
        [InlineData("a@b@univ.edu.ph")]
        [InlineData("")]
        [InlineData("   ")]
        [InlineData(null)]
        public void IsValidStudentEmail_InvalidInput_ReturnsFalse(string email)
        {
            Assert.False(CreateValidator().IsValidStudentEmail(email));
        }

        // ---------- Seat availability (uses mocked repository) ----------

        [Fact]
        public void HasAvailableSeats_SeatsRemaining_ReturnsTrue()
        {
            Assert.True(CreateValidator(capacity: 50, registered: 49).HasAvailableSeats(1));
        }

        [Fact]
        public void HasAvailableSeats_EventFull_ReturnsFalse()
        {
            Assert.False(CreateValidator(capacity: 50, registered: 50).HasAvailableSeats(1));
        }

        [Fact]
        public void HasAvailableSeats_CallsRepositoryForGivenEvent()
        {
            var mockRepo = new Mock<IEventRepository>();
            mockRepo.Setup(r => r.GetCapacity(7)).Returns(10);
            mockRepo.Setup(r => r.GetRegisteredCount(7)).Returns(3);

            var validator = new RegistrationValidator(mockRepo.Object);
            validator.HasAvailableSeats(7);

            mockRepo.Verify(r => r.GetCapacity(7), Times.Once);
            mockRepo.Verify(r => r.GetRegisteredCount(7), Times.Once);
        }
    }
}
