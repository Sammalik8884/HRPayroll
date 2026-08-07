using Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class RolePermission : BaseEntity
    {
        public int RoleId { get; set; }
        public string PermissionCode { get; set; }= string.Empty;
        public virtual Role Role { get; set; } = null!;
    }
}
