using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class FiscalCalendarConfiguration : IEntityTypeConfiguration<FiscalCalendar>
    {
        public void Configure(EntityTypeBuilder<FiscalCalendar> builder)
        {
            builder.ToTable("FiscalCalenders");
            builder.HasKey(t => t.Id);
            builder.HasQueryFilter(e =>!e.IsDeleted);
            builder.Property(e => e.StartDate).HasColumnType("datetime2");
            builder.Property(e => e.EndDate).HasColumnType("datetime2");
            builder.HasIndex(e => e.IsCurrent)
            .IsUnique()
            .HasFilter("IsCurrent = 1");

        }
    }
}
