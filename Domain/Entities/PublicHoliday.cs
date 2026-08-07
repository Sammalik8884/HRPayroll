using Domain.Common;


namespace Domain.Entities
{
    public class PublicHoliday : AuditableEntity
    {
        public string Name { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public bool IsRecurringYearly { get; set; } = false;

    }
}
