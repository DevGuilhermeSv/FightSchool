using Application.DTO.Match;
using Application.Services;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IMatchService
    {
        Task<List<Match>> SearchMatchesAsync(SearchMatch searchMatch);
        Match? GetMatchByIdAsync(Guid id);
        Task<IEnumerable<Match>> GetMatchesByUserIdAsync(Guid userId);
        Task<Guid> CreateMatchAsync(CreateMatch match);
        Task UpdateMatchAsync(UpdateMatch match);
    }
}