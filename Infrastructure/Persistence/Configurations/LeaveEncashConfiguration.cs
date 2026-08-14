using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class LeaveEncashConfiguration :IEntityTypeConfiguration<LeaveEncash>
    {
        public void Configure(EntityTypeBuilder<LeaveEncash> builder)
        {
            builder.ToTable("LeaveEncashes");
            builder.HasKey(e => e.Id);
            //when to use hasone and when to with many and withone and vice versa?
            builder.HasOne(e=>e.Employee).WithMany().HasForeignKey(e=>e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.LeaveType).WithMany().HasForeignKey(e=>e.LeaveTypeId).OnDelete(DeleteBehavior.Restrict);
            builder.HasQueryFilter(e => !e.IsDeleted);
            builder.Property(e => e.Days).HasPrecision(18, 4);
            builder.Property(e=>e.Amount).HasPrecision(18, 4);
            builder.Property(e => e.EncashDate).HasColumnType("datetime2");




        }
    }
}
