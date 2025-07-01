using Application.DTO.Auth;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Domain.Entities;
using Domain.Exceptions;
using Microsoft.AspNetCore.Identity;

namespace Application.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;
    private readonly SignInManager<User> _signInManager;
    private readonly JwtService _jwtService;

    public AuthService(UserManager<User> userManager, IMapper mapper, SignInManager<User> signInManager, JwtService jwtService)
    {
        _userManager = userManager;
        _mapper = mapper;
        _signInManager = signInManager;
        _jwtService = jwtService;
    }

    public async Task<AuthResponse> Login(string email, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            throw new FightSchoolNotFoundException("Usuario não encontrado");
        }
        var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
        if (!result.Succeeded)
        {
            throw new FightSchoolServiceException("Credenciais Invalidas");
        }
        
        var token = await _jwtService.GenerateToken(user);

        return new AuthResponse
        {
            IsAuthSuccessful = true,
            Token = token,
            UserId = user.Id,
            Email = user.Email
        };

    }


}

