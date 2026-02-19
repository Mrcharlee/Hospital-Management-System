using Hospital_Management_System.Backend.Model;
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

        public DbSet<DoctorDetails> DoctorDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Staff>()
                .HasOne(s => s.DoctorDetails)
                .WithOne(d => d.Staff)
                .HasForeignKey<DoctorDetails>(d => d.StaffId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
