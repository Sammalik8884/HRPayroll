using Domain.Common;


namespace Domain.Entities
{
    public class EmployeeDeduction : BaseEntity
    {
        public int DeductionId { get; set; }
        public int EmployeeId { get; set; }
        public decimal Amount { get; set; }
        public virtual Deduction Deduction { get; set; } = null!;
        public virtual Employee Employee { get; set; } = null!;

    }
}
