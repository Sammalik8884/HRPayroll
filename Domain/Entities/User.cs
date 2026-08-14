using Domain.Common;
namespace Domain.Entities
{
    public class User : AuditableEntity
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
        public bool IsActive { get; set; } = true;
        public int? EmployeeId { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
         = new List<UserRole>();
        public virtual Employee Employee { get; set; } = null!;
    }
}
