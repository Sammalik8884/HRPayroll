using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Persistence.Configurations
{
    public class EmployeeFundConfiguration : IEntityTypeConfiguration<EmployeeFund>
    {
        public void Configure(EntityTypeBuilder<EmployeeFund> builder)
        {
            builder.ToTable("EmployeeFunds");
            builder.HasKey(x => x.Id);
            builder.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Fund).WithMany().HasForeignKey(e => e.FundId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.EmployeeSharePercent).HasPrecision(18, 4);
            builder.Property(e => e.EmployerSharePercent).HasPrecision(18, 4);


        }
    }
}
