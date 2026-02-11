using Hospital_Management_System.DbHospital;
using Hospital_Management_System.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Management_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly AppDb _context;

        public DoctorController(AppDb context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<IActionResult> GetAllDoctors()
        {
            var doctors = await _context.Doctors.ToListAsync();
            return Ok(doctors);
        }

      
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctor(Guid id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null) return NotFound();
            return Ok(doctor);
        }

        
        [HttpPost]
        public async Task<IActionResult> AddDoctor(Doctor doctor)
        {
            doctor.Id = Guid.NewGuid();
            await _context.Doctors.AddAsync(doctor);
            await _context.SaveChangesAsync();
            return Ok(doctor);
        }

       
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(Guid id, Doctor updatedDoctor)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null) return NotFound();

            doctor.Name = updatedDoctor.Name;
            doctor.Specialization = updatedDoctor.Specialization;
            doctor.ContactNumber = updatedDoctor.ContactNumber;

            await _context.SaveChangesAsync();
            return Ok(doctor);
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(Guid id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null) return NotFound();

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
