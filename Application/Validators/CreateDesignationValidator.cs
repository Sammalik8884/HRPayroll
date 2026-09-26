using Application.DTOs.Designation;
using FluentValidation;

namespace Application.Validators
{
    public class CreateDesignationValidator : AbstractValidator<CreateDesignationDto>
    {
        public CreateDesignationValidator() {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100).WithMessage("Name is required and should not exceed 100 characters.");

        }
    }
}
