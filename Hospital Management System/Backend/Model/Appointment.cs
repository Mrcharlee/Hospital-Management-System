namespace Hospital_Management_System.Model
{
    public class Appointment
    {
        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public DateTime AppointmentDate { get; set; }
        
        public bool IsCancelled { get; set; }
    }
}
