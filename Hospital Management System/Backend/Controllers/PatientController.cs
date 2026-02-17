using Hospital_Management_System.Interfaces;
using Hospital_Management_System.Model;
using Hospital_Management_System.DTO.Patient;
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
            return NotFound("Patient not found");

        return Ok(patient);
    }

    [HttpPost]
    public async Task <IActionResult> Create([FromBody] CreatePatientDto dto)
    {
        if (dto == null)
            return BadRequest("Patient data is required");

        var patient = await _service.CreateAsync(dto);
        return Ok(patient);
    }

    [HttpPut("{id}")]
    public async Task <IActionResult> Update(Guid id, [FromBody] UpdatePatientDto dto)
    {
        var updated = await _service.UpdateAsync(id, dto);

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
