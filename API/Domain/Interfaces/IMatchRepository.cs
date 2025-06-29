using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IMatchRepository : IRepository<Match>
    {
        // Métodos específicos para Match podem ser adicionados aqui
        Task<IEnumerable<Match>> GetMatchesByUserIdAsync(Guid userId);
    }
}