namespace Hospital_Management_System.DTO.Appointment
{
    public class AppointmentUpdateDto
    {
        public Guid? PatientId { get; set; }
        public DateTime? AppointmentDate { get; set; }
            public bool? IsCancelled { get; set; }
    }
}
