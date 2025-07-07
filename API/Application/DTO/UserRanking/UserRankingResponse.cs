using Application.DTO.User;

namespace Application.DTO.UserRanking;

public class UserRankingResponse
{
    public Guid Id { get; set; } = new Guid();
    public GetUser User { get; set; }
    public int Points { get; set; }
    public int Victories { get; set; }
    public int Defenses { get; set; }
}