using Domain.Entities;

namespace Application.DTO.Match;

public class UpdateMatch
{
    public Guid Id { get; set; }
    public FightStatus? FightStatus { get; set; }
    public int? FighterOneScore { get; set; }
    public int? FighterTwoScore { get; set; }
}