using Hospital_Management_System.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_Management_System.Interfaces
{
    public interface IAppointmentServices
    {
       public Task<List<Appointment>> GetAllAsync();
       public Task<Appointment?> GetByIdAsync(Guid id);
       public Task<Appointment> BookAsync(Appointment appointment);

       public Task<bool> Cancel(Guid id);
    }
}
