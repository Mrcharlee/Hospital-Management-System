namespace Hospital_Management_System.Model
{
    public abstract class Person
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = null!;
        public string Phone { get; set; } = null!;
    }
}
