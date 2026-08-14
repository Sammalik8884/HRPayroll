using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class PayrollRunConfiguration : IEntityTypeConfiguration<PayrollRun>
    {
        public void Configure(EntityTypeBuilder<PayrollRun> builder)
        {
            builder.ToTable("PayRollRuns");
            builder.HasKey(x => x.Id);
            builder.HasQueryFilter(e => !e.IsDeleted);
            builder.Property(e => e.Status).HasConversion<string>().HasMaxLength(20);
            builder.Property(e => e.RunByUserId).HasMaxLength(1000);
            builder.Property(e => e.Notes).HasMaxLength(10000);
            builder.HasMany(e => e.PayrollRunDetails).WithOne(e => e.PayrollRun).HasForeignKey(e => e.PayrollRunId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.RunDate).HasColumnType("datetime2");



        }
    }
}
