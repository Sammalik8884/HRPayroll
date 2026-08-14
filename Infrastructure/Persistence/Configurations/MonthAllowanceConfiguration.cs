using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Persistence.Configurations
{
    public class MonthAllowanceConfiguration : IEntityTypeConfiguration<MonthAllowance>
    {
        public void Configure(EntityTypeBuilder<MonthAllowance> builder)
        {
            builder.ToTable("MonthAllowances");
            builder.HasKey(e => e.Id);
            builder.HasOne(e=>e.Allowance).WithMany().HasForeignKey(e=>e.AllowanceId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.Month).HasColumnType("datetime2");
            builder.Property(e => e.Amount).HasPrecision(18, 4);


        }
    }
}
