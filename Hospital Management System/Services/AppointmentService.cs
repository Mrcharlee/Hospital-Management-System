using Hospital_Management_System.DbHospital;
using Hospital_Management_System.Interfaces;
using Hospital_Management_System.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Hospital_Management_System.Services
{
    public class AppointmentService : IAppointmentServices
    {
        private readonly AppDb _context;

        public AppointmentService(AppDb context)
        {
            _context = context;
        }

        public async Task <List<Appointment>> GetAllAsync()
        {
            return await _context.Appointments.Where(a => !a.IsCancelled).ToListAsync();
        }

        public async Task <Appointment> GetByIdAsync(Guid id)
        {
            return await _context.Appointments.FindAsync(id);
        }

        public async Task <Appointment> BookAsync(Appointment appointment)
        {
            appointment.Id = Guid.NewGuid();
            await _context.Appointments.AddAsync(appointment);
           await  _context.SaveChangesAsync();
            return appointment;
        }

        public async Task <bool> Cancel(Guid id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null) return false;

            appointment.IsCancelled = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
