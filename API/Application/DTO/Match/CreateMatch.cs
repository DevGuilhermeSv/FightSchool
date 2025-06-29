using Domain.Entities;

namespace Application.DTO.Match;

public class CreateMatch
{
    public Guid FighterOneId { get; set; }
    public Guid FighterTwoId { get; set; }
    public DateTime Date { get; set; }
    public FightStatus Status { get; set; } = FightStatus.Pendente;
}