using Domain.Common;


namespace Domain.Entities
{
    public class Roster : AuditableEntity
    {
        public int EmployeeId { get; set; }
        public int ShiftId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; } = true;
        public virtual Employee Employee { get; set; } = null!;
        public virtual Shift Shift { get; set; } = null!;
    }
}
