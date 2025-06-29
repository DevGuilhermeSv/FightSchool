using System.ComponentModel.DataAnnotations;
using Domain.Entities;

namespace Application.DTO.User;

public class UserDto
{
    [EmailAddress]
    public string Email { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Nickname { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public Belt? Belt { get; set; } 
}