using Domain.Common;


namespace Domain.Entities
{
    public class AuditLog : BaseEntity
    {
        public string EntityName { get; set; } = string.Empty;
        public string EntityId { get; set; } = string.Empty;
        public string Action { get; set; } = string.Empty;
        public string? OldValues { get; set; }   
        public string NewValues { get; set; } = string.Empty;
        public string ChangedBy { get; set; }= string.Empty;
        public DateTime ChangedAt { get; set; }

    }
}
