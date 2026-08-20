using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class LoanInstallmentConfiguration : IEntityTypeConfiguration<LoanInstallment>
    {
        public void Configure(EntityTypeBuilder<LoanInstallment> builder)
        {
            builder.ToTable("LoanInstallments");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.DueDate).HasColumnType("datetime2");
            builder.Property(e => e.PaidDate).HasColumnType("datetime2");
            builder.Property(e => e.IsPaid).HasDefaultValue(false);
            builder.Property(e => e.Amount).HasPrecision(18, 4);

        }
    }
}
