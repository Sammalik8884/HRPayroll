using Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class GradeAllowance : BaseEntity
    {
        public int AllowanceId { get; set; }   
        public int GradeId { get; set; }      
        public decimal Amount { get; set; }
        public virtual Grade Grade { get; set; } = null!;
        public virtual Allowance Allowance { get; set; } = null!;

    }
}
