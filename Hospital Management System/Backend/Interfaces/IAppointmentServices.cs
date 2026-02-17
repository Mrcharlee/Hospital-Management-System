using Hospital_Management_System.Model;
using Hospital_Management_System.DTO.Appointment;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_Management_System.Interfaces
{
    public interface IAppointmentServices
    {
        Task<List<AppointmentReadDto?>> GetAllAsync();
        Task<AppointmentReadDto?> GetByIdAsync(Guid id);
        Task<AppointmentReadDto> BookAsync(AppointmentCreateDto dto);
        Task<bool> UpdateAsync(Guid id, AppointmentUpdateDto dto);
        Task<bool> Cancel(Guid id);
    }

   
}
