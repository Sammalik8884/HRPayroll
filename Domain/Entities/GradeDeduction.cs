using Domain.Common;

namespace Domain.Entities
{
    public class GradeDeduction : BaseEntity
    {
        public int DeductionId { get; set; }
        public int GradeId { get; set; }
        public decimal Amount { get; set; }
        public virtual Deduction Deduction { get; set; } = null!;
        public virtual Grade Grade { get; set; } = null!;
    }
}
