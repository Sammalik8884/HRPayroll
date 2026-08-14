using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class LeaveForwardConfiguration : IEntityTypeConfiguration <LeaveForward>
    {
        public void Configure(EntityTypeBuilder<LeaveForward> builder)
        {
            builder.ToTable("LeaveForwards");
            builder.HasKey(e => e.Id);
            builder.HasOne(e => e.LeaveType).WithMany().HasForeignKey(e => e.LeaveTypeId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.FromYear).HasColumnType("datetime2");
            builder.Property(e => e.ToYear).HasColumnType("datetime2");
            builder.Property(e => e.CarriedDays).HasPrecision(18, 4);
            builder.HasQueryFilter(e => !e.IsDeleted);

        
        
        }

    }
}
