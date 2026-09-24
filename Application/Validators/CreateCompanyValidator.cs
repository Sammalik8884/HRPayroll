using Application.DTOs.Company;
using FluentValidation;

namespace Application.Validators
{
    public class CreateCompanyValidator :AbstractValidator<CreateCompanyDto>
    { 
        public CreateCompanyValidator() {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required").MaximumLength(100);
            RuleFor(x => x.Email).EmailAddress();
            RuleFor(x => x.Phone).Matches(@"^\+?[1-9]\d{1,14}$").WithMessage("Invalid phone number format").MaximumLength(20);



        }

    }
}
