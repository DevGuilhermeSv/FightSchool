using Domain.Entities;

namespace Domain.Interfaces;

public interface IUserRankingRepository : IRepository<UserRanking>
{
    IQueryable<UserRanking> GetUserRankingsByBelt(Belt belt);
}