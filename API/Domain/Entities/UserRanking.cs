namespace Domain.Entities;

public class UserRanking
{
    protected UserRanking(){}
    protected UserRanking(int points, int victories, int defenses)
    {
        Points = points;
        Victories = victories;
        Defenses = defenses;
    }
    public UserRanking(User user,int points, int victories, int defenses ) : this(points, victories, defenses)
    {
        UserId = user.Id;
        User = user;
       
    }
    public UserRanking(Guid userId, int points, int victories, int defenses) : this(points, victories, defenses)
    {
        UserId = userId;
    }

    public Guid Id { get; set; } = new Guid();
    public Guid UserId { get; set; }
    public User User { get; set; }
    public int Points { get; set; }
    public int Victories { get; set; }
    public int Defenses { get; set; }
    
}