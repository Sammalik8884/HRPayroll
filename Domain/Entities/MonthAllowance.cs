using Domain.Common;


namespace Domain.Entities
{
    public class MonthAllowance : BaseEntity
    {
        public int AllowanceId { get; set; }  
        public int EmployeeId { get; set; }  
        public DateTime Month { get; set; }    
        public decimal Amount { get; set; }
        public virtual Allowance Allowance { get; set; } = null!;
        public virtual Employee Employee { get; set; } = null!;
    }
}
