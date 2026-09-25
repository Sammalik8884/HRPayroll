using Application.DTOs.Grade;
using FluentValidation;

namespace Application.Validators
{
    public class CreateGradeValidator : AbstractValidator<CreateGradeDto>
    {
        public CreateGradeValidator() {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required").MaximumLength(100);
            RuleFor(x=>x.Code).NotEmpty().WithMessage("Code is required").MaximumLength(20);


        }

    }
}
