using MISA.TTDat_B20DCC178.Infrastructure.Repository;
using MISA.TTDat_B20DCCN178.Core.Interfaces;
using MISA.TTDat_B20DCCN178.Core.Services;
using MISA.TTDat_B20DCCN178.Core;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://127.0.0.1:5500")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

// Add services to the container.
Common.DatabaseString = builder.Configuration.GetConnectionString("Database1");


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// config DI
builder.Services.AddScoped<IEmployeeRespository, EmployeeRepository>();

builder.Services.AddScoped<IEmployeeService, EmployeeService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();