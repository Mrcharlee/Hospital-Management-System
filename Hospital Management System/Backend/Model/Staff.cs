using Hospital_Management_System.Backend.Model;

namespace Hospital_Management_System.Model
{
    public class Staff : Person
    {
       public StaffRole Role { get; set; }
        public bool IsAdmin { get; set; }
        public string Address { get; set; } = null!;
        public DoctorDetails DoctorDetails { get; set; }
    }
}
