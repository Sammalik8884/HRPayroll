using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class SystemDefaultConfiguration :IEntityTypeConfiguration<SystemDefault>
    {
        public void Configure(EntityTypeBuilder<SystemDefault> builder)
        {
            builder.ToTable("SystemDefaults");
            builder.HasKey(e => e.Key);
            builder.Property(e=>e.Key).IsRequired();
            builder.Property(e=>e.Value).IsRequired();
            builder.Ignore(e => e.Id);
        }
        
    }
}
