using Domain.Entities;

namespace Application.DTO.Match;

public class SearchMatch
{
    public FightStatus? FightStatus { get; set; }
    public DateTime? Date { get; set; }
}