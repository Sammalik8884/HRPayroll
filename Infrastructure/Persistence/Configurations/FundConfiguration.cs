

using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class FundConfiguration :IEntityTypeConfiguration<Fund>
    {
        public void Configure(EntityTypeBuilder<Fund> builder) 
        {
            builder.ToTable("Funds");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Name).IsRequired().HasMaxLength(100);
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Description).HasMaxLength(1000);
            builder.Property(e => e.IsActive).HasDefaultValue(true);

        
        
        }
    }
}
