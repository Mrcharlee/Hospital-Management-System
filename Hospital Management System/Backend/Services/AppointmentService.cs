using Hospital_Management_System.DbHospital;
using Hospital_Management_System.Interfaces;
using Hospital_Management_System.Model;
using Hospital_Management_System.DTO.Appointment;
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

        public async Task <List<AppointmentReadDto>> GetAllAsync()
        {
            return await _context.Appointments
                .Where(a => !a.IsCancelled)
                .Select(a => new AppointmentReadDto
                {
                    Id = a.Id,
                    PatientId = a.PatientId,
                    AppointmentDate = a.AppointmentDate,
                    IsCancelled = a.IsCancelled

                })
                .ToListAsync();
        }

        public async Task <AppointmentReadDto?> GetByIdAsync(Guid id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null) return null;

            return new AppointmentReadDto
            {
                Id = appointment.Id,
                PatientId = appointment.PatientId,
                AppointmentDate = appointment.AppointmentDate,
                IsCancelled = appointment.IsCancelled
            };
        }

        public async Task <AppointmentReadDto> BookAsync(AppointmentCreateDto dto)
        {
            var appointment = new Appointment
            {
                Id = Guid.NewGuid(),
                PatientId = dto.PatientId,
                AppointmentDate = dto.AppointmentDate,
                IsCancelled = false,
            };

            await _context.Appointments.AddAsync(appointment);
            await _context.SaveChangesAsync();

        
            return new AppointmentReadDto
            {
                Id = appointment.Id,
                PatientId = appointment.PatientId,
                AppointmentDate = appointment.AppointmentDate,
                IsCancelled = appointment.IsCancelled,
            };
        }

        public async Task<bool> UpdateAsync(Guid id, AppointmentUpdateDto dto)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null) return false;

            appointment.AppointmentDate = (DateTime)dto.AppointmentDate;
            await _context.SaveChangesAsync();
            return true;
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
