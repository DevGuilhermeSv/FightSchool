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
    
    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody]CreateUser userDto)
    {
        var success = await _userService.Create(userDto);
        if (success)
        {
            return StatusCode(201,new { id = userDto.Name });
        }
        
        return BadRequest("User already exists or invalid data.");
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