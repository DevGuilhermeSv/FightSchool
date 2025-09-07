using Application.DTO.User;
using Domain.Entities;

namespace Application.DTO.Match;

public class MatchResponse
{
    public Guid Id { get; init; }
    public MatchInformationResponse FighterOneInformation { get; init; }

    public MatchInformationResponse FighterTwoInformation { get; init; }
    public DateTime Date { get; init; }
    public FightStatus Status { get; init; }
}

public record MatchInformationResponse(
    
    UserDto User,
    Guid UserId ,
    int FighterScore,
    int Punishments ,
    bool VictoryBySubmission 
);