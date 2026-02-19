using Hospital_Management_System.Backend.DTO.Doctor;
using Hospital_Management_System.Backend.Interfaces;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

[ApiController]
[Route("api/staff")]

public class StaffController : ControllerBase

{
    private readonly IStaffService _staffService;

    public StaffController(IStaffService staffService)
    {
        _staffService = staffService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllStaff()
    {
        var staff = await _staffService.GetAllAsync();
        return Ok(staff);
    }

    [HttpPost]
    public async Task<IActionResult> CreateStaff([FromBody] CreateStaffDto dto)
    {
        if (dto == null) return BadRequest("DTO is required");

        var staff = await _staffService.CreateAsync(dto);
        return Ok(staff);
    }

    [HttpPatch("{id}/admin")]
    public async Task<IActionResult> SetAdmin(Guid id, [FromQuery] bool isAdmin)
    {
        var result = await _staffService.SetAdminAsync(id, isAdmin);
        return Ok(result);
    }

}