using Application.DTO.Auth;
using Application.DTO.User;
using Application.Interfaces;
using Application.Services;
using Domain;
using Domain.Entities;
using Domain.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FightSchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly SignInManager<User> _signInManager;
        private readonly JwtService _jwtService;
        private readonly IAuthService _authService;

        public AuthController(
            IUserService userManager,
            SignInManager<User> signInManager,
            JwtService jwtService,
            IAuthService authService)
        {
            _userService = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CreateUser model)
        {
            var userExists = await _userService.FindUserByEmail(model.Email);
            if (userExists != null)
            {
                return BadRequest(new AuthResponse() { IsAuthSuccessful = false, ErrorMessage = "Usuário já existe!" });
            }

            try
            {
                
                await _userService.CreateUser(model);
            }
            catch (FightSchoolServiceException e)
            {
                Console.WriteLine(e);
                return BadRequest(new AuthResponse { IsAuthSuccessful = false, ErrorMessage = e.Message });

            }

            return StatusCode(201, new AuthResponse { IsAuthSuccessful = true, Email = model.Email });
        }

        [HttpPost("login")]
        [ProducesResponseType<AuthResponse>(StatusCodes.Status200OK)]
        [ProducesResponseType<AuthResponse>(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            try
            {
                var result = await _authService.Login(model.Email, model.Password);
                return Ok(result);

            }
            catch (FightSchoolNotFoundException e)
            {
                Console.WriteLine(e);
                return NotFound(new AuthResponse()
                {
                    IsAuthSuccessful = false,
                    ErrorMessage = e.Message
                });
            }
            catch (FightSchoolServiceException e)
            {
                Console.WriteLine(e);
                return BadRequest(new AuthResponse()
                {
                    IsAuthSuccessful = false,
                    ErrorMessage = e.Message
                });
            }
        }
    }

}