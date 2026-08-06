using Domain.Common;
namespace Domain.Entities
{
    public class Grade : AuditableEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public bool IsActive = true;

    }
}
