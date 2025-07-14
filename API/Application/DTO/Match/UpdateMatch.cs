using Domain.Entities;

namespace Application.DTO.Match;

public class UpdateMatch
{
    public Guid Id { get; set; }
    public FightStatus? FightStatus { get; set; }
    public MatchInformationDto? FighterOneInformation { get; set; }
    public MatchInformationDto? FighterTwoInformation { get; set; }
}
public class MatchInformationDto
{
    public int FighterScore { get; set; } = 0;
    public int Punishments { get; set; } = 0;
    public bool VictoryBySubmission { get; set; }
}