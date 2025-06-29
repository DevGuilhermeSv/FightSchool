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

        public async Task<IEnumerable<Match>> GetMatchesByUserIdAsync(Guid userId)
        {
            return await DbSet
                .Where(m => m.FighterOneId == userId || m.FighterTwoId == userId)
                .ToListAsync();
        }
    }
}