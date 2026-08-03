using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Common
{
    public abstract class AuditableEntity :BaseEntity
    {
        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
        public DateTime? DeletedBy { get; set; }
    }
}
