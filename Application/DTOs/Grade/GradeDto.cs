namespace Application.DTOs.Grade
{
    public class GradeDto 
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } =string.Empty;
        public string Code { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; } = string.Empty;

    }

    }

