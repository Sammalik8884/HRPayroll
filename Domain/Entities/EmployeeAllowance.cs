using Domain.Common;


namespace Domain.Entities
{
    public class EmployeeAllowance : BaseEntity
    {
        public int AllowanceId { get; set; }   
        public int EmployeeId { get; set; }    
        public decimal Amount { get; set; }
        public virtual Allowance Allowance { get; set; } = null!;
        public virtual Employee Employee { get; set; } = null!;
    }
}
