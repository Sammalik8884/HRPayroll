

using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class GradeFundConfiguration : IEntityTypeConfiguration<GradeFund>
    {
        public void Configure(EntityTypeBuilder<GradeFund> builder)
        {
            builder.ToTable("GradeFunds");
            builder.HasKey(x=>x.Id);
            builder.HasOne(e => e.Grade).WithMany().HasForeignKey(e => e.GradeId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.EmployeeSharePercent).HasPrecision(18, 4);
            builder.Property(e => e.EmployerSharePercent).HasPrecision(18, 4);
            builder.HasOne(e => e.Fund).WithMany().HasForeignKey(e => e.FundId).OnDelete(DeleteBehavior.Restrict);





        }
    }
}
