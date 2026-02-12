using Hospital_Management_System.DbHospital;
using Hospital_Management_System.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Hospital_Management_System.Services
{
    public class AppointmentService
    {
        private readonly AppDb _context;

        public AppointmentService(AppDb context)
        {
            _context = context;
        }

        public List<Appointment> GetAll()
        {
            return _context.Appointments.Where(a => !a.IsCancelled).ToList();
        }

        public Appointment GetById(Guid id)
        {
            return _context.Appointments.Find(id);
        }

        public Appointment Book(Appointment appointment)
        {
            appointment.Id = Guid.NewGuid();
            _context.Appointments.Add(appointment);
            _context.SaveChanges();
            return appointment;
        }

        public bool Cancel(Guid id)
        {
            var appointment = _context.Appointments.Find(id);
            if (appointment == null) return false;

            appointment.IsCancelled = true;
            _context.SaveChanges();
            return true;
        }
    }
}
