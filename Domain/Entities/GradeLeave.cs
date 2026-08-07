using Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class GradeLeave : AuditableEntity
    {
        public int GradeId { get; set; }
        public int LeaveTypeId { get; set; }
        public decimal AnnualQuota { get; set; }

    }
}
