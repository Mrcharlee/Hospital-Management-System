using Hospital_Management_System.Model;

namespace Hospital_Management_System.Backend.DTO.Doctor
{
    public class CreateStaffDto
    {
        public string FullName { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Address { get; set; } = null!;

        public bool IsAdmin { get; set; }
        public StaffRole Role { get; set; }
        public string? Specialization { get; set; }
    }
}
