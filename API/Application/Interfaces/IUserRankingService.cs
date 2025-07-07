using Application.DTO.UserRanking;
using Domain.Entities;

namespace Application.Interfaces;

public interface IUserRankingService
{
    Task<IEnumerable<UserRankingResponse>> GetRankingsAsync(string? belt = null);
    Task UpdateScore(Match match);
    Task<UserRankingResponse> Create(Guid userId);

}