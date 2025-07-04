using Application.DTO.Match;
using Application.Services;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IMatchService
    {
        Task<List<MatchResponse>> SearchMatchesAsync(SearchMatch searchMatch);
        MatchResponse? GetMatchByIdAsync(Guid id);
        Task<IEnumerable<MatchResponse>> GetMatchesByUserIdAsync(Guid userId);
        Task<Guid> CreateMatchAsync(CreateMatch match);
        Task UpdateMatchAsync(UpdateMatch match);
    }
}