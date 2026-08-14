using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Persistence.Configurations
{
    public class OvertimeRuleConfiguration : IEntityTypeConfiguration<OvertimeRule>
    {
        public void Configure(EntityTypeBuilder<OvertimeRule> builder)
        {
            builder.ToTable("OvertimeRules");
            builder.HasKey(x => x.Id);
            builder.HasOne(e=>e.Grade).WithMany().HasForeignKey(e=>e.GradeId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.Multiplier).HasPrecision(18, 4);
            builder.HasQueryFilter(e => !e.IsDeleted);

        }
    }
}