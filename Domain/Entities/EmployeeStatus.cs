using Domain.Common;
namespace Domain.Entities
{
    public class EmployeeStatus : AuditableEntity
    {
        public string Name { get; set; } = string.Empty;
        public bool IsActive = true;

    }
}
