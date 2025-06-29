using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.DbContext;

namespace Infrastructure.Repository;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(AppDbContext context) : base(context)
    {
    }
    public Task<User?> FindByNicknameAndPhoneNumber(string nickname, string phoneNumber)
    {
        var user = DbSet.FirstOrDefault(u => u.Nickname == nickname && u.PhoneNumber == phoneNumber);
        return Task.FromResult(user);
    }
    
}