using Domain.Common;
using Domain.Enums;


namespace Domain.Entities
{
    public class Attendance : BaseEntity
    {
        public int EmployeeId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public TimeOnly? TimeIn { get; set; }
        public TimeOnly? TimeOut { get; set; }
        public AttendanceStatus Status { get; set; } = AttendanceStatus.Present;
        public decimal? WorkHours { get; set; }
        public decimal? OTHours { get; set; }
        public int ShiftId { get; set; }
        public bool IsManualEntry { get; set; } = false;
        public virtual Employee Employee { get; set; } = null!;
        public virtual Shift Shift { get; set; } = null!;
    }
}
