using Hospital_Management_System.Model;

namespace Hospital_Management_System.Interfaces
{
    public interface IPatientService
    {
       Task <List<Patient>> GetAllAsync();
       Task <Patient> GetByIdAsync(Guid id);
       Task <Patient> CreateAsync(Patient patient);
       Task <Patient> UpdateAsync(Guid id, Patient patient);
       Task <bool> DeleteAsync(Guid id);



    }
}
