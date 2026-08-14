using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class LeaveTypeConfiguration : IEntityTypeConfiguration<LeaveType>
    {
        public void Configure(EntityTypeBuilder<LeaveType> builder) 
        {
            builder.ToTable("LeaveTypes");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Name).IsRequired().HasMaxLength(20);
            builder.Property(e => e.IsPaid).IsRequired().HasDefaultValue(true);
            builder.Property(e => e.IsCarryForwardable).IsRequired().HasDefaultValue(true);
            builder.HasQueryFilter(e => !e.IsDeleted);

        }
    }
}
