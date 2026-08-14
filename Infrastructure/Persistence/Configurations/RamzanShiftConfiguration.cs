using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class RamzanShiftConfiguration : IEntityTypeConfiguration<RamzanShift>
    {
        public void Configure(EntityTypeBuilder<RamzanShift> builder)
        {
            builder.ToTable("RamzanShifts");
            builder.HasKey(x=> x.Id);
            builder.HasQueryFilter(e=>!e.IsDeleted);
            builder.HasOne(e=>e.Shift).WithMany().HasForeignKey(e=>e.ShiftId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.RamzanSetting).WithMany().HasForeignKey(e => e.RamzanSettingId).OnDelete(DeleteBehavior.Restrict);



        }
    }
}
