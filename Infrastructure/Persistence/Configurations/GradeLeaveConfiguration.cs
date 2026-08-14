using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class GradeLeaveConfiguration : IEntityTypeConfiguration<GradeLeave>
    {
        public void Configure(EntityTypeBuilder<GradeLeave> builder) 
        {
            builder.ToTable("GradeLeaves");
            builder.HasKey(x => x.Id);
            builder.Property(e => e.AnnualQuota).HasPrecision(18, 4);
            // why we use only 18,4? 
        }

    }
}
