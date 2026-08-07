using Domain.Common;

namespace Domain.Entities
{
    public class EmployeeFund : BaseEntity
    {
        public int EmployeeId { get; set; }
        public int FundId { get; set; }
        public decimal EmployeeSharePercent { get; set; }  
        public decimal EmployerSharePercent { get; set; }
        public virtual Fund Fund { get; set; } = null!;
        public virtual Employee Employee { get; set; } = null!;
    }
}
