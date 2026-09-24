

using Application.DTOs.Auth;
using FluentValidation;

namespace Application.Validators
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequestDto>
    {
        public RegisterRequestValidator() 
       {
            RuleFor(x => x.FullName).NotEmpty().MaximumLength(100).WithMessage("FullName is required");
            RuleFor(x => x.Email).NotEmpty().EmailAddress().WithMessage("Invalid email format");
            RuleFor(x => x.Password).NotEmpty().MinimumLength(8);
            RuleFor(x => x.ConfirmPassword).NotEmpty().Equal(x => x.Password).WithMessage("Passwords do not match");






        }
    }
}
