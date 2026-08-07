using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
    public class PayrollRun : AuditableEntity
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public PayrollRunStatus Status { get; set; } = PayrollRunStatus.Provisional;
        public DateTime RunDate { get; set; }
        public string RunByUserId { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public virtual ICollection<PayrollDetail> PayrollRunDetails { get; set; } = new List<PayrollDetail>();

    }
}
