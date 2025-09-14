using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IMatchRepository : IRepository<Match>
    {
        IQueryable<Match> GetMatchesByUserIdAsync(Guid userId);
        Task UpdateExpiredMatchsAsync();

    }
}