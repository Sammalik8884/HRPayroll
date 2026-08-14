using Domain.Common;


namespace Domain.Entities
{
    public class RamzanShift : AuditableEntity
    {
        public int RamzanSettingId { get;set; }
        public int ShiftId { get; set; }
        public virtual RamzanSetting RamzanSetting { get; set; } = null!;
        public virtual Shift Shift { get; set; } = null!;
            
    }
}
