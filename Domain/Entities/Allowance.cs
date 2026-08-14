using Domain.Common;
namespace Domain.Entities
{
    public class Allowance : AuditableEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; }= string.Empty;
        public bool IsActive { get; set; } = true;
    }
}
