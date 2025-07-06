using Application.DTO.UserRanking;
using Domain.Entities;

namespace Application.Interfaces;

public interface IUserRankingService
{
    Task<IEnumerable<UserRankingResult>> GetRankingsAsync(string? belt = null);
    Task UpdateScore(Match match);

}