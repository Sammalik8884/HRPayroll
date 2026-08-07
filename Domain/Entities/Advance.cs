using Domain.Common;
using Domain.Enums;


namespace Domain.Entities
{
    public class Advance: AuditableEntity
    {
        public int EmployeeId { get; set; }
        public decimal Amount { get; set; }
        public DateTime RequestDate { get; set; }
        public AdvanceStatus Status { get; set; } = AdvanceStatus.Pending;
        public DateTime RecoveryMonth { get; set; }
        public int ApprovedById { get; set; }
        public bool IsRecovered { get; set; } = false;
        public virtual Employee Employee { get; set; } = null!;

    }
}
