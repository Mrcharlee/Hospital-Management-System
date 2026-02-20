using Hospital_Management_System.Backend.Interfaces;
using Hospital_Management_System.Backend.Services;
using Hospital_Management_System.DbHospital;
using Hospital_Management_System.Interfaces;
using Hospital_Management_System.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
// Add services to the container.
builder.Services.AddDbContext<AppDb>(options =>
{
    options.UseSqlServer(connectionString);
});


builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

builder.Services.AddControllers();


builder.Services.AddScoped<IStaffService, StaffService>();


builder.Services.AddScoped<IAppointmentServices, AppointmentService>();
builder.Services.AddScoped<IPatientService, PatientService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options => {
options.AddPolicy("AllowLocalhostAllPorts", policy => { // Allow any origin where the host is "localhost"
               policy.SetIsOriginAllowed(origin =>
               { if (Uri.TryCreate(origin, UriKind.Absolute, out var uri)) {
                       return uri.Host == "localhost" || uri.Host == "127.0.0.1"; } 
                   return false;
               }) .AllowAnyHeader()
               .AllowAnyMethod();
     });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => // UseSwaggerUI is called only in Development.
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });

}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowLocalhostAllPorts");


app.MapControllers();

app.Run();