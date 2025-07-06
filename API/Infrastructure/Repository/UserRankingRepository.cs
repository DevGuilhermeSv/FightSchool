using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository;

public class UserRankingRepository : BaseRepository<UserRanking>,IUserRankingRepository
{
    public UserRankingRepository(AppDbContext context) : base(context)
    {
    }

    public IQueryable<UserRanking> GetUserRankingsByBelt(Belt belt)
    {
        return DbSet
            .Include(ur => ur.User)
            .Where(ur => ur.User.Belt == belt.ToString());
    }

    public Task<UserRanking?> GetByUserId(Guid userId)
    {
        return DbSet.FirstOrDefaultAsync(ur => ur.UserId == userId);
    }
}
