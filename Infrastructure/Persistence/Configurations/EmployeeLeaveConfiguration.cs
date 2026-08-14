using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class EmployeeLeaveConfiguration : IEntityTypeConfiguration<EmployeeLeave>
    {
        public void Configure(EntityTypeBuilder<EmployeeLeave> builder)
        {
            builder.ToTable("EmployeeLeaves");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.StartDate).IsRequired().HasColumnType("datetime2");
            builder.Property(e => e.EndDate).IsRequired().HasColumnType("datetime2");
            builder.Property(e => e.TotalDays).HasPrecision(18, 4);
            builder.Property(e => e.Reason).HasMaxLength(300);
            builder.Property(e => e.Status)
                .HasConversion<string>()
                .HasMaxLength(20); builder.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Restrict);   
            builder.HasOne(e=>e.LeaveType).WithMany().HasForeignKey(e=>e.LeaveTypeId).OnDelete(DeleteBehavior.Restrict);

        }
    }
}
