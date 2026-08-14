using Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class PayrollDetail : BaseEntity
    {
        public int PayrollRunId { get; set; }
        public int EmployeeId { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal TotalAllowances { get; set; }
        public decimal TotalDeductions { get; set; }
        public decimal TotalFundsEmployee { get; set; }
        public decimal TotalFundsEmployer { get; set; }
        public decimal OvertimeAmount { get; set; }
        public decimal AbsentDeduction { get; set; }
        public decimal LateDeduction { get; set; }
        public decimal LoanDeduction { get; set; }
        public decimal AdvanceDeduction { get; set; }
        public decimal EOBI { get; set; }
        public decimal SESSI { get; set; }
        public decimal GrossSalary { get; set; }
        public decimal NetSalary { get; set; }
        public decimal PresentDays { get; set; } 
        public int AbsentDays { get; set; }
        public decimal OvertimeHours { get; set; }
        public virtual PayrollRun PayrollRun { get; set; } = null!;
        public virtual Employee Employee { get; set; } = null!;


    }
}
