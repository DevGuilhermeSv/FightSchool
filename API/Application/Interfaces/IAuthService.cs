using Application.DTO.Auth;

namespace Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponse> Login(string email, string password);
} 