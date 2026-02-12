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
    public IActionResult GetAll()
    {
        var patients = _service.GetAll();
        return Ok(patients);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        var patient = _service.GetById(id);
        if (patient == null) return NotFound();
        return Ok(patient);
    }

    [HttpPost]
    public IActionResult Create(Patient patient)
    {
        var created = _service.Create(patient);
        return Ok(created);
    }

    [HttpPut("{id}")]
    public IActionResult Update(Guid id, Patient patient)
    {
        var updated = _service.Update(id, patient);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var success = _service.Delete(id);
        if (!success) return NotFound();
        return Ok();
    }
}
