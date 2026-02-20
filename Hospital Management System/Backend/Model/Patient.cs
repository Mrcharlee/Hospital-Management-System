namespace Hospital_Management_System.Model
{
    public class Patient : Person
    {
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string BloodGroup { get; set; } = null!;
    }
}
