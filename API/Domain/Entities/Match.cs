namespace Domain.Entities;

public class Match
{
    protected Match() { }
    public Match(User fighterOne, User fighterTwo, DateTime date)
    {
        Id = Guid.NewGuid();
        FighterOne = fighterOne;
        FighterTwo = fighterTwo;
        Date = date.ToUniversalTime();
    }
    public Guid Id { get; set; }
    public User FighterOne { get; set; }
    public Guid FighterOneId { get; set; }
    public User FighterTwo { get; set; }
    public Guid FighterTwoId { get; set; }
    public DateTime Date { get; set; }
    public int FighterOneScore { get; set; }
    public int FighterTwoScore { get; set; }
    
    private FightStatus _status;
    
    public string Status
    {
        get => _status.ToString();
        set => _status = Enum.Parse<FightStatus>(value);
    }

    public bool WasProcessed { get; set; } = false;
}

public enum FightStatus
{
    Pendente,
    Finalizado,
    Cancelado
}