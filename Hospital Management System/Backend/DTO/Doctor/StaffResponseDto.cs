using Hospital_Management_System.Model;

namespace Hospital_Management_System.Backend.DTO.Doctor
{
    public class StaffResponseDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Address { get; set; } = null!;
        public StaffRole Role { get; set; }
        public bool IsAdmin { get; set; }
        public string? Specialization { get; set; }

    }
}
