namespace Hospital_Management_System.DTO.Patient
{
    public class UpdatePatientDto
    {
        public string? FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? BloodGroup { get; set; }
    }

}
