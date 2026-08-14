using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Persistence.Configurations
{
    public class AttendanceConfiguration : IEntityTypeConfiguration<Attendance>
    {
        public void Configure(EntityTypeBuilder<Attendance> builder)
        {
            builder.ToTable("Attendances");
            builder.HasKey(x => x.Id);
            builder.Property(e => e.WorkHours).HasPrecision(18, 4);
            builder.Property(e => e.OTHours).HasPrecision(18, 4);
            builder.HasOne(e => e.Shift).WithMany().HasForeignKey(e => e.ShiftId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e=>e.Employee).WithMany().HasForeignKey(e=>e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(e => e.Status)
    .HasConversion<string>()
    .HasMaxLength(20);
        }
    }
}
