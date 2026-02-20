namespace Hospital_Management_System.DTO.Patient
{
    public class CreatePatientDto
    {
        public string FullName { get; set; } = null!;
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string BloodGroup { get; set; } = null!;
    }

}
