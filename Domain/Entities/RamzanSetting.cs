using Domain.Common;


namespace Domain.Entities
{
    public class RamzanSetting : AuditableEntity
    {
        public int Year { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
