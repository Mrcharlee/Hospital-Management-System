namespace Hospital_Management_System.Model
{
    public class Patient : Person
    {
        public Guid  Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public string BloodGroup { get; set; }
    }
}
