using Domain.Common;


namespace Domain.Entities
{
    public class Settlement : AuditableEntity
    {
        public int EmployeeId { get; set; }
        public DateTime SettlementDate { get; set; }
        public decimal GraduityAmount { get; set; }
        public decimal LeaveEncashmentAmount { get; set; }
        public decimal OutstandingLoan { get; set; }
        public decimal NetSettlement { get; set; }

    }
}
