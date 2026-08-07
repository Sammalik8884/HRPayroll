using Domain.Common;
namespace Domain.Entities
{
    public class LeaveType : AuditableEntity
    {
        public string Name { get; set; } = string.Empty;
        public bool IsPaid { get; set; } = true;
        public bool IsCarryForwardable { get; set; } = true;
        public int MaxCarryForwardDays { get; set; } 
    }
}
