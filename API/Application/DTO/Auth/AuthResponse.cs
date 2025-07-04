namespace Application.DTO.Auth;

public class AuthResponse
{
    
    public bool IsAuthSuccessful { get; set; }
    public string? ErrorMessage { get; set; }
    public string? Token { get; set; }
    public Guid? UserId { get; set; }
    public string? Email { get; set; }
}