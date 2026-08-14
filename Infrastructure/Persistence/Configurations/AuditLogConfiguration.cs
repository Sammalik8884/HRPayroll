using Domain.Common;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class AuditLogConfiguration :IEntityTypeConfiguration<AuditLog>
    {
        public void Configure(EntityTypeBuilder<AuditLog> builder)
        {
            builder.ToTable("AuditLog");
            builder.Property(e => e.EntityName).IsRequired().HasMaxLength(100);
            builder.Property(e => e.EntityId).IsRequired().HasMaxLength(1000);
            builder.Property(e => e.Action).IsRequired().HasMaxLength(1000);
            builder.Property(e => e.OldValues).HasMaxLength(10000);
            builder.Property(e => e.NewValues).IsRequired().HasMaxLength(10000);
            builder.Property(e => e.ChangedBy).IsRequired().HasMaxLength(100);
            builder.Property(e => e.ChangedAt).HasColumnType("datetime2");




        }
    }
}
