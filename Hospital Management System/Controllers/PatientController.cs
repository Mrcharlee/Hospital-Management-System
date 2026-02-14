using Hospital_Management_System.Interfaces;
using Hospital_Management_System.Model;
using Microsoft.AspNetCore.Mvc;

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
        if (patient == null) return NotFound();
        return Ok(patient);
    }

    [HttpPost]
    public async Task <IActionResult> Create(Patient patient)
    {
        var created = await _service.CreateAsync(patient);
        return Ok(created);
    }

    [HttpPut("{id}")]
    public async Task <IActionResult> Update(Guid id, Patient patient)
    {
        var updated = await _service.UpdateAsync(id, patient);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task <IActionResult> Delete(Guid id)
    {
        var success = await _service.DeleteAsync(id);
        if (!success) return NotFound();
        return Ok();
    }
}
