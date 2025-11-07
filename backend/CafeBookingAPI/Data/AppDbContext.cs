using CafeBookingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CafeBookingAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Table> Tables { get; set; }
        public DbSet<Booking> Bookings { get; set; }
    }
}
