using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class RamzanSettingConfiguration : IEntityTypeConfiguration<RamzanSetting>
    {
        public void Configure(EntityTypeBuilder<RamzanSetting> builder)
        {

            builder.ToTable("RamzanSettings");
            builder.HasKey(x => x.Id);
            builder.HasQueryFilter(e => !e.IsDeleted);
            builder.Property(e => e.StartDate).HasColumnType("datetime2");
            builder.Property(e => e.EndDate).HasColumnType("datetime2");
            builder.Property(e=>e.IsActive).HasDefaultValue(true);



        }
    }
}
