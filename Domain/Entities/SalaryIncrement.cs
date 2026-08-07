using Domain.Common;


namespace Domain.Entities
{
    public class SalaryIncrement : AuditableEntity
    {
        public int EmployeeId { get; set; }
        public decimal OldBasicSalary { get; set; }
        public decimal NewBasicSalary { get; set; }
        public DateTime EffectiveDate { get; set; }
        public string? Reason { get; set; }
        public virtual Employee Employee { get; set; } = null!;
    }
}
