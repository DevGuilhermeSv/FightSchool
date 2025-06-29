using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.DbContext;

namespace Infrastructure.Repository;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(AppDbContext context) : base(context)
    {
    }
   
    
}