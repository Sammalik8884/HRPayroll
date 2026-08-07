using Domain.Common;

namespace Domain.Entities
{
    public class MonthFund : BaseEntity
    {
        public DateTime Month { get; set; }
        public int EmployeeId { get; set; }
        public int FundId { get; set; }
        public decimal Amount { get; set; }
        public virtual Fund Fund { get; set; } = null!;
        public virtual Employee Employee { get; set; } = null!;
    }
}
