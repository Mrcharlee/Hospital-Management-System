using Hospital_Management_System.DbHospital;
using Hospital_Management_System.Interfaces;
using Hospital_Management_System.Model;
using Microsoft.EntityFrameworkCore;
using Hospital_Management_System.DTO.Patient;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class PatientService : IPatientService
{
    private readonly AppDb _context;

    public PatientService(AppDb context)
    {
        _context = context;
    }

    public async Task<List<Patient>> GetAllAsync()
    {
        return await _context.Patients.ToListAsync();

    }
    public async Task <Patient> GetByIdAsync(Guid id)
    {
        return await _context.Patients.FindAsync(id);
    }

    public async Task <Patient> CreateAsync(CreatePatientDto dto)
    {
        var patient = new Patient
        {
            Id = Guid.NewGuid(),
            FullName = dto.FullName,
            DateOfBirth = dto.DateOfBirth,
            Gender = dto.Gender,
            Phone = dto.Phone,
            Address = dto.Address,
            BloodGroup = dto.BloodGroup

        };

       await _context.Patients.AddAsync(patient);
       await _context.SaveChangesAsync();
        return patient;

    }

    public async Task <Patient?> UpdateAsync(Guid id, UpdatePatientDto dto)
    {
        var existingPatient = await _context.Patients.FindAsync(id);

        if (existingPatient == null)
        {
            return null;
        }

        if (dto.FullName != null) existingPatient.FullName = dto.FullName;
        if (dto.DateOfBirth != null) existingPatient.DateOfBirth = dto.DateOfBirth.Value;
        if (dto.Gender != null) existingPatient.Gender = dto.Gender;
        if (dto.Phone != null) existingPatient.Phone = dto.Phone;
        if (dto.Address != null) existingPatient.Address = dto.Address;
        if (dto.BloodGroup != null) existingPatient.BloodGroup = dto.BloodGroup;
  
        await _context.SaveChangesAsync();
        return existingPatient;
    }

    public async Task <bool> DeleteAsync(Guid id)
    {
        var patient = await _context.Patients.FindAsync(id);

        if (patient == null)
        {
            return false;
        }

        _context.Patients.Remove(patient);
       await _context.SaveChangesAsync();

        return true;
    }
}

