using Application.DTO.User;
using Domain.Entities;

namespace Application.DTO.Match;

public class MatchResponse
{
    public Guid Id { get; set; }
    public GetUser FighterOne { get; set; }
    public GetUser FighterTwo { get; set; }
    public DateTime Date { get; set; }
    public int? FighterOneScore { get; set; }
    public int? FighterTwoScore { get; set; }
    public FightStatus Status { get; set; }
}