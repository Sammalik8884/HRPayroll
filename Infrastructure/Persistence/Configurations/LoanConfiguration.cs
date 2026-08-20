using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class LoanConfiguration : IEntityTypeConfiguration<Loan>
    {
        public void Configure(EntityTypeBuilder<Loan> builder)
        {
            builder.ToTable("Loans");
            builder.HasKey(e => e.Id);
            // what is the difference between an Interface and Abstract class? also in function and store procedure?
            builder.HasOne(e => e.Employee).WithMany(e=>e.Loans).HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.LoanAmount).HasPrecision(18, 4);
            builder.Property(e => e.RemainingBalance).HasPrecision(18, 4);
            builder.Property(e => e.InstallmentAmount).HasPrecision(18, 4);
            builder.Property(e => e.IssueDate).HasColumnType("datetime2");
            builder.Property(e => e.EndDate).HasColumnType("datetime2");
            builder.Property(e => e.Status).HasConversion<string>().HasDefaultValue(LoanStatus.Active);
            builder.Property(e => e.Notes).HasMaxLength(1000);
            builder.HasMany(e => e.Installments).WithOne(e => e.Loan).HasForeignKey(e => e.LoanId).OnDelete(DeleteBehavior.Restrict);
            builder.HasQueryFilter(e => !e.IsDeleted); // what does this (e => !e.IsDeleted) means

        }

    }
}
