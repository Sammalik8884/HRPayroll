using Domain.Common;

namespace Domain.Entities
{
    public class OvertimeRule: AuditableEntity
    {
        public int GradeId { get; set; }
        public decimal Multiplier { get; set; }
        public int MinOTHours { get; set; }
        public int MaxOTHours { get; set; }
        public virtual Grade Grade { get; set; } = null!;

    }
}
