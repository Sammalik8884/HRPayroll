using Domain.Common;


namespace Domain.Entities
{
    public class Section : AuditableEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; } = null!;

    }
}
