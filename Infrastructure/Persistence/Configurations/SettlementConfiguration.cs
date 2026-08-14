using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class SettlementConfiguration : IEntityTypeConfiguration<Settlement>
    {
       public void Configure(EntityTypeBuilder<Settlement> builder)
        {
            builder.ToTable("Settlements");
            builder.HasKey(x => x.Id);
            builder.HasQueryFilter(e => !e.IsDeleted);
            builder.HasOne(e=>e.Employee).WithMany().HasForeignKey(e=>e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.SettlementDate).HasColumnType("datetime2");
            builder.Property(e => e.GraduityAmount).HasPrecision(18, 4);
            builder.Property(e => e.LeaveEncashmentAmount).HasPrecision(18, 4);
            builder.Property(e => e.OutstandingLoan).HasPrecision(18, 4);
            builder.Property(e => e.NetSettlement).HasPrecision(18, 4);

        }
    }
}
