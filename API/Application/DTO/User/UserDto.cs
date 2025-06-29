using System.ComponentModel.DataAnnotations;
using Domain.Entities;

namespace Application.DTO.User;

public class UserDto
{
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public Belt? Belt { get; set; } 
}