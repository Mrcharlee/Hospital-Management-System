using Hospital_Management_System.Interfaces;
using Hospital_Management_System.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("api/patient")]
public class PatientController : ControllerBase
{
    private readonly IPatientService _service;

    public PatientController(IPatientService service)
    {
        _service = service; 
    }

    [HttpGet]
    public async Task <IActionResult> GetAll()
    {
        var patients = await _service.GetAllAsync();
        return Ok(patients);
    }

    [HttpGet("{id}")]
    public async Task <IActionResult> GetById(Guid id)
    {
        var patient = await _service.GetByIdAsync(id);
        if (patient == null)
            return NotFound("Patientnot found");

        return Ok(patient);
    }

    [HttpPost]
    public async Task <IActionResult> Create([FromBody] Patient patient)
    {
        if (patient ==null)
            return BadRequest("Patient data is required");

        var created = await _service.CreateAsync(patient);
        return Ok(created);
    }

    [HttpPut("{id}")]
    public async Task <IActionResult> Update(Guid id, [FromBody] Patient patient)
    {
        var updated = await _service.UpdateAsync(id, patient);

        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task <IActionResult> Delete(Guid id)
    { 
        var success = await _service.DeleteAsync(id);
        if (!success) 
            return NotFound("Patient Not found");
        
        return Ok("Delete successfully");
    }
}
