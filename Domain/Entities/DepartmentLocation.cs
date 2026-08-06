using Domain.Common;


namespace Domain.Entities
{
    public class DepartmentLocation : BaseEntity
    {
        public int DepartmentId { get; set; }
        public int LocationId { get; set; }
        public virtual Department Department { get; set; } = null!;
        public virtual Location Location { get; set; } = null!;
    }
}
