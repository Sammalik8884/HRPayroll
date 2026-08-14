using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Persistence.Configurations
{
    public class MonthFundConfiguration : IEntityTypeConfiguration<MonthFund>
    {
        public void Configure(EntityTypeBuilder<MonthFund> builder)
        {
            builder.ToTable("MonthFunds");
            builder.Property(e => e.Month).HasColumnType("datetime2");
            builder.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Fund).WithMany().HasForeignKey(e => e.FundId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.Amount).HasPrecision(18, 4);
            builder.HasKey(e => e.Id);

        }
    }
}
