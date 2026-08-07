using Domain.Common;
using Domain.Enums;
namespace Domain.Entities
{
    public class EmployeeLeave : AuditableEntity
    {
        public int EmployeeId { get; set; }
        public int LeaveTypeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalDays { get; set; }
        public string? Reason { get; set; }
        public LeaveStatus Status { get; set; } = LeaveStatus.Pending;
        public int ApprovedById { get; set; }
        public virtual Employee Employee { get; set; }=null!;
        public virtual LeaveType LeaveType { get; set; } = null!;

    }
}
