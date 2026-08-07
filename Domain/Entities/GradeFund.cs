using Domain.Common;


namespace Domain.Entities
{
    public class GradeFund : BaseEntity
    {
        public int GradeId { get; set; }
        public decimal EmployeeSharePercent { get; set; }
        public decimal EmployerSharePercent { get; set; }
        public int FundId { get; set; }
        public virtual Fund Fund { get; set; } = null!;
        public virtual Grade Grade { get; set; } = null!;
    }
}
