using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Persistence.Configurations
{
    public class GradeDeductionConfiguration :IEntityTypeConfiguration<GradeDeduction>
    {
        public void Configure(EntityTypeBuilder<GradeDeduction> builder)
        {
            builder.ToTable("GradeDeductions");
            builder.HasKey(x => x.Id);
            builder.HasOne(e => e.Grade).WithMany().HasForeignKey(e => e.GradeId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Deduction).WithMany().HasForeignKey(e => e.DeductionId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.Amount).HasPrecision(18, 4);

        }
    }
}
