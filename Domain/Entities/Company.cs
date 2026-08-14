using Domain.Common;

namespace Domain.Entities
{
    public class Company : AuditableEntity
    {
       
        public string Name { get; set; }=string.Empty;
        public string? Address { get; set; } 
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? LogoPath { get; set; }
        public bool IsActive { get; set; } = true;
        public virtual ICollection<Department> Departments { get; set; } = new List<Department>();

    }
}
