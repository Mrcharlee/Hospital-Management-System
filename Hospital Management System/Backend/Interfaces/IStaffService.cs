using Hospital_Management_System.Backend.DTO.Doctor;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace Hospital_Management_System.Backend.Interfaces
{
    public interface IStaffService
    {
        Task<IEnumerable<StaffResponseDto>> GetAllAsync();
        Task<StaffResponseDto> CreateAsync(CreateStaffDto dto);
        Task<StaffResponseDto> GetByIdAsync(Guid id);
        Task<bool> DeleteAsync(Guid id);
        Task<bool> SetAdminAsync(Guid staffId, bool isAdmin);
    }
}
