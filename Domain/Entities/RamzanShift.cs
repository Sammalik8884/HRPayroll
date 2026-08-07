using Domain.Common;


namespace Domain.Entities
{
    public class RamzanShift : AuditableEntity
    {
        public int RamzanSettingId { get;set; }
        public int ShiftId { get; set; }
            
    }
}
