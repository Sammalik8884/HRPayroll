using Domain.Common;

namespace Domain.Entities
{
    public class Department : AuditableEntity
    {
        public string Name { get; set; } = string.Empty;
        public int CompanyId { get; set; }
        public int? ParentId { get; set; }
        public virtual Company Company { get; set; } = null!;
        public virtual ICollection<Department> SubDepartments { get; set; } = new List<Department>(); 
        public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
        public virtual Department? Parent { get; set; }

    }
}
