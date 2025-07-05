using Application.DTO.Match;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FightSchool.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Este controller agora exige autenticação

    public class MatchController : ControllerBase
    {
        private readonly IMatchService _matchService;

        public MatchController(IMatchService matchService)
        {
            _matchService = matchService;
        }

        // Endpoint para buscar uma lista de matches com base em critérios de busca
        [HttpGet]
        [ProducesResponseType<List<MatchResponse>>(StatusCodes.Status200OK)]

        public async Task<IActionResult> SearchMatches([FromQuery] SearchMatch searchCriteria)
        {
            var matches = await _matchService.SearchMatchesAsync(searchCriteria);

            return Ok(matches);
        }

        // Endpoint para recuperar um match pelo ID
        [HttpGet("{id:guid}")]
        [ProducesResponseType<MatchResponse>(StatusCodes.Status200OK)]
        public IActionResult GetMatchById(Guid id)
        {
            var match = _matchService.GetMatchByIdAsync(id);

            if (match == null)
                return NotFound($"Nenhum match encontrado com o ID: {id}");

            return Ok(match);
        }

        // Endpoint para recuperar matches de um usuário pelo ID do usuário
        [HttpGet("user/{userId:guid}")]
        public async Task<IActionResult> GetMatchesByUserId(Guid userId)
        {
            var matches = await _matchService.GetMatchesByUserIdAsync(userId);

            if (matches == null || !matches.Any())
                return NotFound($"Nenhum match encontrado para o usuário com o ID: {userId}");

            return Ok(matches);
        }

        // Endpoint para criar um novo match
        [HttpPost]
        public async Task<IActionResult> CreateMatch([FromBody] CreateMatch createMatch)
        {
            if (createMatch == null)
                return BadRequest("Os dados do match não foram fornecidos.");

            var matchId = await _matchService.CreateMatchAsync(createMatch);
            return CreatedAtAction(nameof(GetMatchById), new { id = matchId }, createMatch);
        }

        // Endpoint para atualizar um match existente
        [HttpPut]
        public async Task<IActionResult> UpdateMatch([FromBody] UpdateMatch updateMatch)
        {
            if (updateMatch == null)
                return BadRequest("Os dados para atualização não foram fornecidos.");

            await _matchService.UpdateMatchAsync(updateMatch);
            return NoContent();
        }
    }
}