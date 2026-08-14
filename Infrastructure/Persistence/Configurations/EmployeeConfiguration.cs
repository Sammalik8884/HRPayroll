using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder) 
        { 
          builder.ToTable("Employees");
           builder.HasKey(x => x.Id);
            builder.Property(x => x.FirstName).IsRequired().HasMaxLength(100);
            builder.Property(x => x.LastName).IsRequired().HasMaxLength(100);
            builder.Property(x => x.CNIC).IsRequired().HasMaxLength(13).IsFixedLength();
            builder.HasIndex(x=>x.CNIC).IsUnique();
            builder.Property(e => e.BasicSalary).HasPrecision(18, 4);
            builder.Property(e => e.Gender).HasConversion<string>().HasMaxLength(10);
            builder.HasOne(e => e.ReportingManager).WithMany(e => e.Subordinates).HasForeignKey(e => e.ReportingManagerId).OnDelete(DeleteBehavior.Restrict);
            builder.HasQueryFilter(e => !e.IsDeleted);
        }
    }
}
