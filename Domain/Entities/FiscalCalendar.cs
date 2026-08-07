using Domain.Common;


namespace Domain.Entities
{
    public class FiscalCalendar : AuditableEntity
    {
        public int Year { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsCurrent { get; set; } = false;

    }
}
