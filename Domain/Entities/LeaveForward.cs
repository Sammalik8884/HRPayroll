

using Domain.Common;

namespace Domain.Entities
{
    public class LeaveForward : AuditableEntity
    {
        public int EmployeeId { get; set; }
        public int LeaveTypeId { get; set; }
        public DateTime FromYear { get; set; }
        public DateTime ToYear { get; set; }
        public decimal CarriedDays { get; set; }
        public virtual Employee Employee { get; set; }=null!;
        public virtual LeaveType LeaveType { get; set; }  =null!;



    }
}
