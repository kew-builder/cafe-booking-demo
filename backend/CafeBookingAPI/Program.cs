using CafeBookingAPI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// อ่าน connection string จาก environment ปัจจุบัน
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var provider = builder.Configuration["DatabaseProvider"];

builder.Services.AddDbContext<AppDbContext>(options =>
{
    if (provider == "PostgreSQL")
        options.UseNpgsql(connectionString);
    else if (provider == "SqlServer")
        options.UseSqlServer(connectionString);
    else
        throw new Exception("Unknown database provider. Check DatabaseProvider in appsettings.json");
});

// CORS setup
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins(
                "https://cafe-booking-demo.vercel.app", 
                "https://localhost:4200"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors(MyAllowSpecificOrigins);

if (builder.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
