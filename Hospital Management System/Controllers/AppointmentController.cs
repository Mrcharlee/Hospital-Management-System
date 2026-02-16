using Hospital_Management_System.DbHospital;
using Hospital_Management_System.DTO.Appointment;
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
        public async Task <IActionResult> Book([FromBody]AppointmentCreateDto dto)
        {
            if (dto == null)
                return BadRequest("Appointment data is required");

            var boooked = await _service.BookAsync(dto);

            return Ok(boooked);
        }
       
    
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] AppointmentUpdateDto dto)
        {
            if (dto == null)
                return BadRequest("Update is required");

            var success = await _service.UpdateAsync(id, dto);

            if (!success)
                return NotFound("Appointment not Found");


            return Ok("Appointment cancelled successfully");
        }

        [HttpDelete("cancel/{id}")]
        public async Task<IActionResult> Cancel(Guid id)
        {
            var success =  await _service.Cancel(id);

            if (!success)
                return NotFound("Appointment Not Found");

            return Ok("Appointment Cancelled Succcessfully");
        }
    }
}
