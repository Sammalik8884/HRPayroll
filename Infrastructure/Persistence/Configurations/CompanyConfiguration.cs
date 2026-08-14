using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class CompanyConfiguration : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.ToTable("Companies");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Name).IsRequired().HasMaxLength(100);
            builder.Property(e => e.Address).HasMaxLength(200);
            builder.Property(e => e.Phone).HasMaxLength(20);
            builder.Property(e => e.Email).HasMaxLength(100);
            builder.Property(e => e.LogoPath).HasMaxLength(100);
            builder.Property(e=>e.IsActive).IsRequired();
            builder.HasQueryFilter(e => !e.IsDeleted);

        }
    }
}
