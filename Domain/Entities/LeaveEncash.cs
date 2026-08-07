using Domain.Common;

namespace Domain.Entities
{
    public class LeaveEncash : AuditableEntity
    {
        public int EmployeeId { get; set; }
        public int LeaveTypeId { get; set; }
        public decimal Days { get; set; }
        public decimal Amount { get; set; }
        public DateTime EncashDate { get; set; }

    }
}
