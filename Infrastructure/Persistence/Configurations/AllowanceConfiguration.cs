using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Builders;



namespace Infrastructure.Persistence.Configurations
{
    public class AllowanceConfiguration : IEntityTypeConfiguration<Allowance>
    {
        public void Configure(EntityTypeBuilder<Allowance> builder)
        {
            builder.ToTable("Allowances");
            builder.HasKey(a => a.Id);
            builder.Property(a => a.Name).IsRequired().HasMaxLength(100);
            builder.Property(a=>a.Description).IsRequired().HasMaxLength(100);
            builder.Property(a => a.IsActive).HasDefaultValue(true);
            builder.HasQueryFilter(a => !a.IsDeleted);

        }
    }
}
