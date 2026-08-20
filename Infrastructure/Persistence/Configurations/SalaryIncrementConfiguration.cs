using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class SalaryIncrementConfiguration :IEntityTypeConfiguration<SalaryIncrement>
    {
        public void Configure(EntityTypeBuilder<SalaryIncrement> builder)
        {
            builder.ToTable("SalaryIncrements");
            builder.HasKey(e => e.Id);
            builder.HasOne(e=>e.Employee).WithMany(e=>e.SalaryIncrements).HasForeignKey(e=>e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.OldBasicSalary).HasPrecision(18, 4);
            builder.Property(e => e.NewBasicSalary).HasPrecision(18, 4);
            builder.Property(e => e.EffectiveDate).HasColumnType("datetime2");
            builder.HasQueryFilter(e => !e.IsDeleted);





        }
    }
}
