using Hospital_Management_System.Model;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Management_System.DbHospital
{
    public class AppDb : DbContext
    {
        public AppDb(DbContextOptions<AppDb> options) : base(options)
        {
        }
        public DbSet<Patient> Patients { get; set; }
       

        public DbSet<Appointment> Appointments { get; set; }

        public DbSet<Staff> Staffs { get; set; }
    }
}
