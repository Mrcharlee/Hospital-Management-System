namespace Hospital_Management_System.DTO.Appointment
{
    public class AppointmentReadDto
    {
        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public bool IsCancelled { get; set; }

    }
}
