using Application.DTO;
using Application.DTO.Auth;
using Application.DTO.User;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FightSchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly JwtService _jwtService;

        public AuthController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            JwtService jwtService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CreateUser model)
        {
            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
            {
                return BadRequest(new AuthResponse() { IsAuthSuccessful = false, ErrorMessage = "Usuário já existe!" });
            }

            var user = new User
            {
                Email = model.Email,
                UserName = model.Email // Geralmente o email é usado como UserName para Identity
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                return BadRequest(new AuthResponse { IsAuthSuccessful = false, ErrorMessage = string.Join(", ", errors) });
            }

            // Opcional: Atribuir um papel padrão ao novo usuário
            // await _userManager.AddToRoleAsync(user, "User");

            return StatusCode(201, new AuthResponse { IsAuthSuccessful = true, Email = user.Email });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Unauthorized(new AuthResponse { IsAuthSuccessful = false, ErrorMessage = "Credenciais inválidas." });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized(new AuthResponse { IsAuthSuccessful = false, ErrorMessage = "Credenciais inválidas." });
            }

            var token = await _jwtService.GenerateToken(user);

            return Ok(new AuthResponse
            {
                IsAuthSuccessful = true,
                Token = token,
                UserId = user.Id,
                Email = user.Email
            });
        }
    }
}