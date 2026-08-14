using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class MonthDeductionConfiguration : IEntityTypeConfiguration<MonthDeduction>
    {
        public void Configure(EntityTypeBuilder<MonthDeduction> builder)
        {

            builder.ToTable("MonthDeductions");
            builder.HasKey(x => x.Id);
            builder.HasOne(e => e.Deduction).WithMany().HasForeignKey(e => e.DeductionId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.Amount).HasPrecision(18, 4);
            builder.Property(e => e.Month).HasColumnType("datetime2");


        }
    }
}
