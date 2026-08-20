using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class RoleConfiguration :IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.ToTable("Roles");
            builder.HasKey(e => e.Id);
            builder.HasQueryFilter(e => !e.IsDeleted);
            builder.Property(e => e.Name).IsRequired().HasMaxLength(100);
            builder.Property(e => e.Description).IsRequired().HasMaxLength(100);
            builder.Property(e => e.IsActive).HasDefaultValue(true);





        }

    }
}
