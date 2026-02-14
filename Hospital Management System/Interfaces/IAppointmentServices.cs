using Hospital_Management_System.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_Management_System.Interfaces
{
    public interface IAppointmentServices
    {
        Task<List<Appointment>> GetAllAsync();
        Task<Appointment?> GetByIdAsync(Guid id);
        Task<Appointment> BookAsync(Appointment appointment);

        Task<bool> Cancel(Guid id);
    }
}
