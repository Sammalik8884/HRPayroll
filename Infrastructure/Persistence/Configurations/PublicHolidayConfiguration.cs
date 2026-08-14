using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Diagnostics.Contracts;


namespace Infrastructure.Persistence.Configurations
{
    public class PublicHolidayConfiguration : IEntityTypeConfiguration<PublicHoliday>
    {
        public void Configure(EntityTypeBuilder<PublicHoliday> builder)
        {
            builder.ToTable("PublicHolidays");
            builder.HasKey(x => x.Id);
            builder.HasQueryFilter(e => !e.IsDeleted);
            builder.Property(e => e.Name).IsRequired().HasMaxLength(100);
            builder.Property(e => e.Date).HasColumnType("datetime2");
            builder.Property(e=>e.IsRecurringYearly).HasDefaultValue(false);
        }
    }
}
