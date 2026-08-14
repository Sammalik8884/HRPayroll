using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class DepartmentConfiguration : IEntityTypeConfiguration<Department>
    {
        public void Configure(EntityTypeBuilder<Department> builder)
        {
            builder.ToTable("Departments");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Name).IsRequired().HasMaxLength(100);
            builder.HasOne(e => e.Company).WithMany(c => c.Departments).HasForeignKey(e => e.CompanyId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Parent)
           .WithMany(e => e.SubDepartments)
           .HasForeignKey(e => e.ParentId)
           .OnDelete(DeleteBehavior.Restrict);
            builder.HasQueryFilter(e => !e.IsDeleted);
        }
    }
}
