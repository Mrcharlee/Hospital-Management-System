namespace Hospital_Management_System.DTO.Appointment
{
    public class AppointmentCreateDto
    {
        public Guid PatientId { get; set; }
        public DateTime AppointmentDate { get; set; }
    }
}
