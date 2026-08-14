using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class AdvanceConfiguration : IEntityTypeConfiguration<Advance>
    {
        public void Configure(EntityTypeBuilder<Advance> builder)
        {
            builder.ToTable("Advances");
            builder.HasKey(e => e.Id);
            builder.HasOne(e=>e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.Amount).HasPrecision(18, 4);
            builder.Property(e => e.RequestDate).HasColumnType("datetime2");
            builder.Property(e => e.Status).HasConversion<string>().HasMaxLength(20);
            builder.Property(e => e.RecoveryMonth).HasColumnType("datetime2");
            builder.Property(e => e.IsRecovered).HasDefaultValue(false);
            builder.HasQueryFilter(e => !e.IsDeleted);



        }
    }
}
