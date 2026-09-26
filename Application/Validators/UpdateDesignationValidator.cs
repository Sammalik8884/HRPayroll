
using Application.DTOs.Designation;
using FluentValidation;

namespace Application.Validators
{
    public class UpdateDesignationValidator : AbstractValidator<UpdateDesignationDto>
    {
        public UpdateDesignationValidator() {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(100).WithMessage("Name cannot exceed 100 characters.");

        }
    }
}
