using Hospital_Management_System.Model;

namespace Hospital_Management_System.Interfaces
{
    public interface IPatientService
    {
        List<Patient> GetAll();
        Patient GetById(Guid id);
        Patient Create(Patient patient);
        Patient Update(Guid id, Patient patient);
        bool Delete(Guid id);



    }
}
