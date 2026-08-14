using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Persistence.Configurations
{
    public class DeductionConfiguration : IEntityTypeConfiguration<Deduction>
    {
        public void Configure(EntityTypeBuilder<Deduction> builder)
        {
            builder.ToTable("Deductions");
            // what is the reason of plural name of the tables?
            builder.HasKey(d => d.Id);
            builder.Property(e => e.Name).IsRequired().HasMaxLength(100);
            builder.Property(e => e.Description).IsRequired().HasMaxLength(100);
            builder.Property(e => e.IsActive).HasDefaultValue(true);
            builder.HasQueryFilter(e => !e.IsDeleted);
            //what does hasqueryfilter do?



        }
    }
}
