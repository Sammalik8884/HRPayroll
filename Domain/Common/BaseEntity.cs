using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Common
{
    public abstract  class BaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedAt {  get; set; }
        public DateTime UpdatedAt { get; set; }
        public string CreatedBy { get; set; } = string.Empty;

        public string UpdatedBy { get; set; }= string.Empty;

    }
}
