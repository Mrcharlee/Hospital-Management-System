using Hospital_Management_System.DTO.Patient;
using Hospital_Management_System.Model;

namespace Hospital_Management_System.Interfaces
{
    public interface IPatientService
    {
       Task <List<Patient>> GetAllAsync();
       Task <Patient> GetByIdAsync(Guid id);
       Task <Patient> CreateAsync(CreatePatientDto dto);
       Task <Patient> UpdateAsync(Guid id, UpdatePatientDto dto);
       Task <bool> DeleteAsync(Guid id);
       
    }
}
