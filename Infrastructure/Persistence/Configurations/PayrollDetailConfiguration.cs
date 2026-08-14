using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class PayrollDetailConfiguration : IEntityTypeConfiguration<PayrollDetail>
    {
        public void Configure(EntityTypeBuilder<PayrollDetail> builder)
        {
            builder.ToTable("PayRollDetails");
            builder.HasKey(x => x.Id);
            builder.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.PayrollRun).WithMany().HasForeignKey(e => e.PayrollRunId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.BasicSalary).HasPrecision(18, 4);
            builder.Property(e => e.TotalAllowances).HasPrecision(18, 4);
            builder.Property(e => e.TotalDeductions).HasPrecision(18, 4);
            builder.Property(e => e.TotalFundsEmployee).HasPrecision(18, 4);
            builder.Property(e => e.TotalFundsEmployer).HasPrecision(18, 4);
            builder.Property(e => e.OvertimeAmount).HasPrecision(18, 4);
            builder.Property(e => e.AbsentDeduction).HasPrecision(18, 4);
            builder.Property(e => e.LateDeduction).HasPrecision(18, 4);
            builder.Property(e => e.LoanDeduction).HasPrecision(18, 4);
            builder.Property(e => e.AdvanceDeduction).HasPrecision(18, 4);
            builder.Property(e => e.EOBI).HasPrecision(18, 4);
            builder.Property(e => e.SESSI).HasPrecision(18, 4);
            builder.Property(e => e.GrossSalary).HasPrecision(18, 4);
            builder.Property(e => e.NetSalary).HasPrecision(18, 4);
            builder.Property(e => e.PresentDays).HasPrecision(18, 4);
            builder.Property(e => e.OvertimeHours).HasPrecision(18, 4);


        }
    }
}
