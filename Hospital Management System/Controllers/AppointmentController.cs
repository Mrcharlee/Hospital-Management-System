using Hospital_Management_System.DbHospital;
using Hospital_Management_System.Interfaces;
using Hospital_Management_System.Model;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Hospital_Management_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentServices _service;

        public AppointmentController(IAppointmentServices service)
        {
            _service = service;
        }


        [HttpGet]
        public async Task<IActionResult>  GetAll()
        {
            var appointments = await _service.GetAllAsync();
            return Ok(appointments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {

            var appointment = await _service.GetByIdAsync(id);

            if (appointment == null)
            
                return NotFound("Appointment not found ");

            return Ok(appointment);
        }


        [HttpPost("book")]
        public async Task <IActionResult> Book([FromBody]Appointment appointment)
        {
            if (appointment == null)
                return BadRequest("Appointment data is required");

            var boooked = await _service.BookAsync(appointment);

            return Ok(boooked);
        }
       
    
        [HttpPut("cancel/{id}")]
        public async Task<IActionResult> Cancel(Guid id)
        {
            var sucess = await _service.Cancel(id);

            if (!sucess)
                return NotFound("Appointment not Found");

            return Ok("Appointment cancelled successfully");
        }
    }
}
