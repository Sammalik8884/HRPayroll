using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            builder.ToTable("UserRoles");
            builder.HasKey(x => x.Id);
            builder.HasOne(e => e.User)
                .WithMany(e => e.UserRoles)  
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Role)
                .WithMany(e => e.UserRoles)  
                .HasForeignKey(e => e.RoleId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
