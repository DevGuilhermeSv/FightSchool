namespace Domain.Entities;

public class UserRanking
{
    public UserRanking(User user, int points, int victories, int defenses)
    {
        UserId = user.Id;
        User = user;
        Points = points;
        Victories = victories;
        Defenses = defenses;
    }

    public Guid Id { get; set; } = new Guid();
    public Guid UserId { get; set; }
    public User User { get; set; }
    public int Points { get; set; }
    public int Victories { get; set; }
    public int Defenses { get; set; }
    
}