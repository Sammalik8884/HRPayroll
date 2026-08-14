using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class ShiftConfiguration : IEntityTypeConfiguration<Shift>
    {
        public void Configure(EntityTypeBuilder<Shift> builder)
        {
            builder.ToTable("Shifts");
            builder.Property(e=>e.Name).IsRequired().HasMaxLength(64);
            builder.Property(e=>e.StandardHours).HasPrecision(18,4).IsRequired();
            builder.Property(e => e.IsActive).IsRequired().HasDefaultValue(true);
            builder.HasKey(e => e.Id);
            builder.HasQueryFilter(e => !e.IsDeleted);
        }
    }
}
