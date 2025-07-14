using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository
{
    public class MatchRepository : BaseRepository<Match>, IMatchRepository
    {
        public MatchRepository(AppDbContext context) : base(context)
        {
        }

        public IQueryable<Match> GetMatchesByUserIdAsync(Guid userId)
        {
            return  DbSet
                .Where(m => m.FighterOneInformation.UserId == userId || m.FighterTwoInformation.UserId == userId);
        }
    }
}