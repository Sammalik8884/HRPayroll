using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Persistence.Configurations
{
    public class GradeAllowanceConfiguration : IEntityTypeConfiguration<GradeAllowance>
    {
        public void Configure(EntityTypeBuilder<GradeAllowance> builder) 
        {
            builder.ToTable("GradeAllowances");
            builder.HasKey(e=>e.Id);
            builder.Property(e => e.Amount).HasPrecision(18, 4);
            builder.HasOne(e=>e.Grade).WithMany().HasForeignKey(e=>e.GradeId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Allowance).WithMany().HasForeignKey(e => e.AllowanceId).OnDelete(DeleteBehavior.Restrict);
            builder.HasIndex(e => new { e.GradeId, e.AllowanceId }).IsUnique();
        
        }
    }
}
