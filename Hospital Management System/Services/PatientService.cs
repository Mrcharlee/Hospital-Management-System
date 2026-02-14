using Hospital_Management_System.DbHospital;
using Hospital_Management_System.Interfaces;
using Hospital_Management_System.Model;
using Microsoft.EntityFrameworkCore;


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

    public async Task <Patient> CreateAsync(Patient patient)
    {
        patient.Id = Guid.NewGuid();

       await _context.Patients.AddAsync(patient);
       await _context.SaveChangesAsync();
        return patient;

    }

    public async Task <Patient?> UpdateAsync(Guid id, Patient updatedPatients)
    {
        var existingPatient = await _context.Patients.FindAsync(id);

        if (existingPatient == null)
        {
            return null;
        }

        existingPatient.Name = updatedPatients.Name;
        existingPatient.Age = updatedPatients.Age;
        existingPatient.Address = updatedPatients.Address;
        existingPatient.BloodGroup = updatedPatients.BloodGroup;

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

