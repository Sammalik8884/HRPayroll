using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class GradeConfiguration : IEntityTypeConfiguration<Grade>
    {
        public void Configure(EntityTypeBuilder<Grade> builder)
        {
            builder.ToTable("Grades");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
            builder.HasIndex(x => x.Name).IsUnique();
            builder.Property(x => x.Description).HasMaxLength(500);
            builder.HasQueryFilter(g => !g.IsDeleted);
            builder.Property(g => g.IsActive).HasDefaultValue(true);
            builder.Property(g => g.Code).IsRequired().HasMaxLength(10);
            builder.HasKey(x => x.Id);
        }
    }
}
