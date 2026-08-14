using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class EmployeeAllowanceConfiguration : IEntityTypeConfiguration<EmployeeAllowance>
    {
        public void Configure(EntityTypeBuilder<EmployeeAllowance> builder)
        {
            builder.ToTable("EmployeeAllowances");
            builder.HasKey(e => e.Id);
            builder.HasOne(e => e.Employee).WithMany().HasForeignKey(e=>e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Allowance).WithMany().HasForeignKey(e => e.AllowanceId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.Amount).HasPrecision(18, 4);

        }
    }
}
