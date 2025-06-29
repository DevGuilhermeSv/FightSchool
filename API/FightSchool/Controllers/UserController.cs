using Application.DTO.User;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FightSchool.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IUserInterface _userService;
    
    public UserController(ILogger<UserController> logger, IUserInterface userService)
    {
        _logger = logger;
        _userService = userService;
    }
    
    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery]UserDto userDto)
    {
        var users = await _userService.Search(userDto);
        if (users == null || users.Count == 0)
        {
            return NotFound("No users found.");
        }
    
        return Ok(users);
    }

    [HttpGet("get/{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var user = await _userService.GetById(id);
        if (user == null)
        {
            return NotFound("User not found.");
        }
    
        return Ok(user);
    }
}