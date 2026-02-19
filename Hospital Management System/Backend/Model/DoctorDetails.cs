using Hospital_Management_System.Model;

namespace Hospital_Management_System.Backend.Model
{
    public class DoctorDetails
    {
        public Guid Id { get; set; }
        public Guid StaffId { get; set; }

        public string Specialization { get; set; } = null!;

        public Staff Staff { get; set; } = null!;
        public string Address { get; internal set; }
    }
}
