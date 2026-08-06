using Domain.Common;
namespace Domain.Entities
{
    public class Location : AuditableEntity
    {
        public string Name { get; set; }=string.Empty;
        public string Address { get; set; } = string.Empty;
        public int GeoLocationId { get; set; }
        
        public bool IsActive = true;
        public virtual GeoLocation GeoLocation { get; set; } = null!;



    }
}
