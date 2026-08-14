using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class EmployeeDeductionConfiguration : IEntityTypeConfiguration<EmployeeDeduction>
    {
        public void Configure(EntityTypeBuilder<EmployeeDeduction> builder)
        {
            builder.ToTable("EmployeeDeductions");
            builder.HasKey(e => e.Id);
            builder.HasOne(e => e.Deduction).WithMany().HasForeignKey(e => e.DeductionId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.Amount).HasPrecision(18, 4);
        }
    }
}
