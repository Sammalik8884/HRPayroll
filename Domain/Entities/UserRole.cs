using Domain.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Domain.Entities
{
    public class UserRole : BaseEntity
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual Role Role { get; set; } = null!;
    }
}
