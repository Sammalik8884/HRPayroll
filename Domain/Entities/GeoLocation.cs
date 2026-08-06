using Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class GeoLocation : AuditableEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int? ParentId { get; set; }
        public virtual GeoLocation? Parent { get; set; }
        public virtual ICollection<GeoLocation> Children { get; set; } = new List<GeoLocation>();


    }
}
