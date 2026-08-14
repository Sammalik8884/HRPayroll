using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Persistence.Configurations
{
    public class RosterConfiguration : IEntityTypeConfiguration<Roster>
    {
        public void Configure(EntityTypeBuilder<Roster> builder)
        {
            builder.ToTable("Rosters");
            builder.HasKey(x => x.Id);
            builder.HasQueryFilter(e => !e.IsDeleted);
            builder.Property(e => e.StartDate).HasColumnType("datetime2");
            builder.Property(e => e.EndDate).HasColumnType("datetime2");
            builder.Property(e=>e.IsActive).HasDefaultValue(true);
            builder.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Shift).WithMany().HasForeignKey(e => e.ShiftId).OnDelete(DeleteBehavior.Restrict);

        }
    }
}
