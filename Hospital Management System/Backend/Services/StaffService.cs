using Hospital_Management_System.Backend.DTO.Doctor;
using Hospital_Management_System.Backend.Interfaces;
using Hospital_Management_System.Backend.Model;
using Hospital_Management_System.DbHospital;
using Hospital_Management_System.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Hospital_Management_System.Backend.Services
{
    public class StaffService : IStaffService
    {
        private readonly AppDb _context;

        public StaffService(AppDb context)
        {
            _context = context;
        }

        public async Task<IEnumerable<StaffResponseDto>> GetAllAsync()
        {
            return await _context.Staffs
                .Include(s => s.DoctorDetails)
                .Select(s => new StaffResponseDto
                {
                    Id = s.Id,
                    FullName = s.FullName,
                    Phone = s.Phone,
                    Role = s.Role,
                    IsAdmin = s.IsAdmin,
                    Specialization = s.DoctorDetails != null ? s.DoctorDetails.Specialization : null

                })
                .ToListAsync();
        }
        public async Task<StaffResponseDto> CreateAsync(CreateStaffDto dto)
        {
            var staff = new Staff
            {
                Id = Guid.NewGuid(),
                FullName = dto.FullName,
                Phone = dto.Phone,
                IsAdmin = dto.IsAdmin
            };

            _context.Staffs.Add(staff);

            if (dto.Role == StaffRole.Doctor && !string.IsNullOrEmpty(dto.Specialization))
            {
                _context.DoctorDetails.Add(new DoctorDetails
                {
                    Id = Guid.NewGuid(),
                    StaffId = staff.Id,
                    Specialization = dto.Specialization,
                    Address = dto.Address,
                });
                
            }
            await _context.SaveChangesAsync();

            return await GetByIdAsync(staff.Id);
        }
        public async Task<StaffResponseDto> GetByIdAsync(Guid id)
        {
            var staff = await _context.Staffs
                .Include(s => s.DoctorDetails)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (staff == null) return null; // simple, no exception

            return new StaffResponseDto
            {
                Id = staff.Id,
                FullName = staff.FullName,
                Phone = staff.Phone,
                Address = staff.Address,
                Role = staff.Role,
                IsAdmin = staff.IsAdmin,
                Specialization = staff.DoctorDetails?.Specialization
            };
        }

        // Delete staff
        public async Task<bool> DeleteAsync(Guid id)
        {
            var staff = await _context.Staffs.FindAsync(id);
            if (staff == null) return false;

            _context.Staffs.Remove(staff);
            await _context.SaveChangesAsync();
            return true;
        }

        // Set or remove admin
        public async Task<bool> SetAdminAsync(Guid staffId, bool isAdmin)
        {
            var staff = await _context.Staffs.FindAsync(staffId);
            if (staff == null) return false;

            staff.IsAdmin = isAdmin;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}


