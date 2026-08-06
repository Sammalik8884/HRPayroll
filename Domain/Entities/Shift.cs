using Domain.Common;

namespace Domain.Entities
{
    public class Shift : AuditableEntity
    {
        public string Name { get; set; } = string.Empty;
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public int GraceMinutes { get; set; }
        public int LateAfterMinutes { get; set; }
        public int HalfDayMinutes { get; set; }
        public decimal StandardHours { get; set; }
         public bool IsActive { get; set; }

    }
}
