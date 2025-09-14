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
        
        /// <summary>
        /// Atualiza o status de todas as lutas pendentes que tenham ultrapassado o dia do evento
        /// para o status de expirado 
        /// </summary>
        public async Task UpdateExpiredMatchsAsync()
        {
            await DbSet
                .Where(m => m.Date < DateTime.UtcNow && ( m.Status == FightStatus.Pendente.ToString() || m.Status == FightStatus.Confirmado.ToString()) )
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(m => m.Status, m => "Expirado"));
  
        }
    }
}