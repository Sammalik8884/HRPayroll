using Domain.Common;


namespace Domain.Entities
{
    public class SystemDefault : BaseEntity
    {

        public string Key { get; set; } = string.Empty;
        public string  Value { get; set; } = string.Empty;

    }
}
