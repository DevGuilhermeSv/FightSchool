using System.ComponentModel.DataAnnotations;
using System.Data;

namespace Application.DTO.User;

using FluentValidation;

public class CreateUser : UserDto
{
    [Required] [MinLength(6)] public string Password { get; set; }
}

// Validator class for CreateUser
public class CreateUserValidator : AbstractValidator<CreateUser>
{
    public CreateUserValidator()
    {
        RuleFor(user => user.Email).NotEmpty().EmailAddress();
        RuleFor(user => user.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(50).WithMessage("Name must not exceed 50 characters.");

        RuleFor(user => user.UserName)
            .NotEmpty().WithMessage("Nickname is required.")
            .MaximumLength(30).WithMessage("Nickname must not exceed 30 characters.");

        RuleFor(user => user.PhoneNumber)
            .NotEmpty().WithMessage("PhoneNumber is required.")
            .Length(11)
            .WithMessage("PhoneNumber must be a valid number of 11 digits.");

        RuleFor(user => user.Belt)
            .IsInEnum().WithMessage("Invalid belt color.");
    }
}