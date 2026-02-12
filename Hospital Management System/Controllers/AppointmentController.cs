using Hospital_Management_System.DbHospital;
using Hospital_Management_System.Model;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDb _context;

        public AppointmentController(AppDb context)
        {
            _context = context;
        }

       
        [HttpPost("book")]
        public IActionResult Book(Appointment appointment)
        {
            
            appointment.Id = Guid.NewGuid();
            
            _context.Appointments.Add(appointment);
            _context.SaveChanges();

            
            return Ok(appointment);
        }
       
        [HttpGet]
        public IActionResult List()
        {
            var activeAppointments = _context.Appointments
                                             .Where(a => !a.IsCancelled)
                                             .ToList();

            return Ok(activeAppointments);
        }
    
        [HttpPut("cancel/{id}")]
        public IActionResult Cancel(Guid id)
        {
           
            var appointment = _context.Appointments.Find(id);

            if (appointment == null)
                return NotFound("Appointment not found");

           
            appointment.IsCancelled = true;
            _context.SaveChanges();

            return Ok("Appointment cancelled successfully");
        }
    }
}
