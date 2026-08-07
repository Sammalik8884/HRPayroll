using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
    public class Loan : AuditableEntity
    {
        public int EmployeeId { get; set; }
        public decimal LoanAmount { get; set; }
        public decimal RemainingBalance { get; set; }
        public int TotalInstallments { get; set; }
        public int RemainingInstallments { get; set; }
        public decimal InstallmentAmount { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime EndDate { get; set; }
        public LoanStatus Status { get; set; } = LoanStatus.Active;
        public string? Notes { get; set; }
        public virtual ICollection<LoanInstallment> Installments { get; set; }
            = new List<LoanInstallment>();
        public virtual Employee Employee { get; set; } = null!;
    }
}
