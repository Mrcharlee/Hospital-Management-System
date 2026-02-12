using Hospital_Management_System.DbHospital;
using Hospital_Management_System.Interfaces;
using Hospital_Management_System.Model;


public class PatientService : IPatientService
{
    private readonly AppDb _context;

    public PatientService(AppDb context)
    {
        _context = context;
    }

    public List<Patient> GetAll()
    {
        return _context.Patients.ToList();

    }
    public Patient GetById(Guid id)
    {
        return _context.Patients.Find(id);
    }

    public Patient Create(Patient patient)
    {
        patient.Id = Guid.NewGuid();

        _context.Patients.Add(patient);
        _context.SaveChanges();
        return patient;

    }

    public Patient Update(Guid id, Patient updatedPatients)
    {
        var existingPatient = _context.Patients.Find(id);

        if (existingPatient == null)
        {
            return null;
        }

        existingPatient.Name = updatedPatients.Name;
        existingPatient.Age = updatedPatients.Age;
        existingPatient.Address = updatedPatients.Address;
        existingPatient.BloodGroup = updatedPatients.BloodGroup;

        _context.SaveChanges();
        return existingPatient;
    }

    public bool Delete(Guid id)
    {
        var patient = _context.Patients.Find(id);

        if (patient == null)
        {
            return false;
        }

        _context.Patients.Remove(patient);
        _context.SaveChanges();

        return true;
    }


}

