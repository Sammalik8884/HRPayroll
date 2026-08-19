using Domain.Common;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Persistence
{
    public class HRPayrollDbContext : DbContext
    {
        private readonly ICurrentUserService _currentuser;
        public HRPayrollDbContext(ICurrentUserService currentuser, DbContextOptions<HRPayrollDbContext> options) : base(options)
        {
            _currentuser = currentuser;
        }
        public DbSet<Company> Companies => Set<Company>();
        public DbSet<Department> Departments => Set<Department>();
        public DbSet<Employee> Employees => Set<Employee>();
        public DbSet<Grade> Grades => Set<Grade>();
        public DbSet<Designation> Designations => Set<Designation>();
        public DbSet<Advance> Advances => Set<Advance>();
        public DbSet<Allowance> Allowances => Set<Allowance>();
        public DbSet<Attendance> Attendances => Set<Attendance>();
        public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
        public DbSet<Deduction> Deductions => Set<Deduction>();
        public DbSet<DepartmentLocation> DepartmentLocations => Set<DepartmentLocation>();
        public DbSet<EmployeeAllowance> EmployeeAllowances => Set<EmployeeAllowance>();
        public DbSet<EmployeeDeduction> EmployeeDeductions => Set<EmployeeDeduction>();
        public DbSet<EmployeeFund> EmployeeFunds => Set<EmployeeFund>();
        public DbSet<EmployeeLeave> EmployeeLeaves => Set<EmployeeLeave>();
        public DbSet<EmployeeStatus> EmployeeStatuses => Set<EmployeeStatus>();
        public DbSet<FiscalCalendar> FiscalCalendars => Set<FiscalCalendar>();
        public DbSet<Fund> Funds => Set<Fund>();
        public DbSet<GeoLocation> GeoLocations => Set<GeoLocation>();
        public DbSet<GradeAllowance> GradeAllowances => Set<GradeAllowance>();
        public DbSet<GradeDeduction> GradeDeductions => Set<GradeDeduction>();
        public DbSet<GradeFund> GradeFunds => Set<GradeFund>();
        public DbSet<GradeLeave> GradeLeaves => Set<GradeLeave>();
        public DbSet<LeaveEncash> LeaveEncashes => Set<LeaveEncash>();
        public DbSet<LeaveForward> LeaveForwards => Set<LeaveForward>();
        public DbSet<LeaveType> LeaveTypes => Set<LeaveType>();
        public DbSet<Loan> Loans => Set<Loan>();
        public DbSet<LoanInstallment> LoanInstallments => Set<LoanInstallment>();
        public DbSet<Location> Locations => Set<Location>();
        public DbSet<MonthAllowance> MonthAllowances => Set<MonthAllowance>();
        public DbSet<MonthDeduction> MonthDeductions => Set<MonthDeduction>();
        public DbSet<MonthFund> MonthFunds => Set<MonthFund>();
        public DbSet<OvertimeRule> OvertimeRules => Set<OvertimeRule>();
        public DbSet<PayrollDetail> PayrollDetails => Set<PayrollDetail>();
        public DbSet<PayrollRun> PayrollRuns => Set<PayrollRun>();
        public DbSet<PublicHoliday> PublicHolidays => Set<PublicHoliday>();
        public DbSet<RamzanSetting> RamzanSettings => Set<RamzanSetting>();
        public DbSet<RamzanShift> RamzanShifts => Set<RamzanShift>();
        public DbSet<Role> Roles => Set<Role>();
        public DbSet<RolePermission> RolePermissions => Set<RolePermission>();
        public DbSet<Roster> Rosters => Set<Roster>();
        public DbSet<SalaryIncrement> SalaryIncrements => Set<SalaryIncrement>();
        public DbSet<Section> Sections => Set<Section>();
        public DbSet<Settlement> Settlements => Set<Settlement>();
        public DbSet<Shift> Shifts => Set<Shift>();
        public DbSet<SystemDefault> SystemDefaults => Set<SystemDefault>();
        public DbSet<User> Users => Set<User>();
        public DbSet<UserRole> UserRoles => Set<UserRole>();
      //  public DbSet<AdvanceRule> AdvanceRules => Set<AdvanceRule>();
       // public DbSet<GradeAdvance> GradeAdvances => Set<GradeAdvance>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.ApplyConfigurationsFromAssembly(
                typeof(HRPayrollDbContext).Assembly);

            base.OnModelCreating(modelBuilder);
        }

        public override async Task<int> SaveChangesAsync(
            CancellationToken cancellationToken = default)
        {
            foreach (var entry in ChangeTracker.Entries<BaseEntity>())
            { 
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.CreatedBy = _currentuser.UserId;
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                    entry.Entity.UpdatedBy= _currentuser.UserId;
                }
                if (entry.State == EntityState.Modified)
                {

                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                    entry.Entity.UpdatedBy = _currentuser.UserId;


                }
            }
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                if (entry.State == EntityState.Deleted)
                {
                    entry.State = EntityState.Modified; 
                    entry.Entity.IsDeleted = true;      
                    entry.Entity.DeletedAt = DateTime.UtcNow;
                    entry.Entity.DeletedBy =_currentuser.UserId;
                }
            }


            return await base.SaveChangesAsync(cancellationToken);
        }


    }
}
       







    

