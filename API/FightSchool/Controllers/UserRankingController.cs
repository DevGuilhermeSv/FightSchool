﻿// Controllers/UserRankingsController.cs

using Application.DTO.UserRanking;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FightSchool.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class UserRankingsController : ControllerBase
{
    private readonly IUserRankingService _userRankingService;

    public UserRankingsController(IUserRankingService userRankingService)
    {
        _userRankingService = userRankingService;
    }

    /// <summary>
    /// Retrieves a list of user rankings, optionally filtered by belt.
    /// Results are ordered by victories (desc), then points (desc), then defenses (asc).
    /// </summary>
    /// <param name="belt">Optional. The belt to filter by (e.g., "Branca", "Preta").</param>
    /// <returns>A list of UserRanking objects.</returns>
    [HttpGet]
    [ProducesResponseType<List<UserRankingResponse>>(statusCode: 200)]
    public async Task<IActionResult> GetUserRankings([FromQuery] string? belt = null)
    {
        var rankings = await _userRankingService.GetRankingsAsync(belt);
        
        return Ok(rankings);
    }
}