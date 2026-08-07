using Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class LoanInstallment : AuditableEntity
    {
        public int LoanId { get; set; }
        public int InstallmentNumber { get; set; }
        public DateTime DueDate { get; set; }
        public decimal Amount { get; set; }
        public bool IsPaid { get; set; } = false;
        public DateTime? PaidDate { get; set; }

        // Navigation
        public virtual Loan Loan { get; set; } = null!;
    }
}
