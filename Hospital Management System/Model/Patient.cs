namespace Hospital_Management_System.Model
{
    public class Patient
    {
        public Guid  Id { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public string Address { get; set; }
        public string BloodGroup { get; set; }
    }
}
