using Domain.Common;
using Domain.Enums;


namespace Domain.Entities
{
    public class Employee : AuditableEntity
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; }= string.Empty;
        public string FatherName { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public GenderEnum Gender { get; set; }
        
        public string CNIC {  get; set; }=string.Empty;
        public DateTime? CNICExpiry { get; set; }
        public string? PersonalEmail { get; set; } = string.Empty;
        public string? PersonalPhone { get; set; } = string.Empty;
        public string? PermanentAddress { get; set; } = string.Empty;
        public string? CurrentAddress { get; set; } = string.Empty;
        public string? BloodGroup { get; set; } = string.Empty;
        public string EmployeeCode { get; set; } = string.Empty;
        public DateTime JoiningDate { get; set; }
        public DateTime? ConfirmationDate { get; set; }
        public DateTime? ResignationDate { get; set; }
        public DateTime? TerminationDate { get; set; }
        public int DepartmentId { get; set; }
        public int DesignationId { get; set; }
        public int GradeId { get; set; }
        public int? ShiftId { get; set; }
        public int? SectionId { get; set; }
        public int EmployeeStatusId { get; set; }
        public int? ReportingManagerId { get; set; }
        public decimal BasicSalary { get; set; }
        public string? BankName { get; set; }= string.Empty;
        public string? BankAccountNumber { get; set; } = string.Empty;
        public string? IBAN { get; set; } = string.Empty;
        public string? BankBranchCode { get; set; } = string.Empty;
        public string? TaxNumber { get; set; } = string.Empty;
        public string? PhotoPath { get; set; } = string.Empty;
        public int? UserId { get; set; }
        public bool IsActive { get; set; } = true;
        public virtual Department Department { get; set; } = null!;
        public virtual Designation Designation { get; set; } = null!;
        public virtual Grade Grade { get; set; } = null!;
        public virtual Shift? Shift { get; set; }
        public virtual Section? Section { get; set; }
        public virtual EmployeeStatus EmployeeStatus { get; set; } = null!;
        public virtual Employee? ReportingManager { get; set; }
        public virtual ICollection<Employee> Subordinates { get; set; } = new List<Employee>();
        public virtual ICollection<SalaryIncrement> SalaryIncrements { get; set; } = new List<SalaryIncrement>();
        public virtual ICollection<EmployeeLeave> Leaves { get; set; } = new List<EmployeeLeave>();
        public virtual ICollection<Loan> Loans { get; set; } = new List<Loan>();
        public virtual ICollection<Advance> Advances { get; set; } = new List<Advance>(); 
        public virtual ICollection<LeaveForward> LeaveForwards { get; set; } = new List<LeaveForward>();
        public virtual ICollection<LeaveEncash> LeaveEncashes { get; set; } = new List<LeaveEncash>(); 



    }
}
