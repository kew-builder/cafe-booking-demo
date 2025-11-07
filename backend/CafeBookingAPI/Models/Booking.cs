namespace CafeBookingAPI.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } = "";
        public DateTime BookingDate { get; set; }
        public int TableId { get; set; }
        public Table? Table { get; set; }
    }
}
