namespace Domain.Entities;

public class Match
{
    protected Match()
    {
    }

    public Match(User fighterOne, User fighterTwo, DateTime date)
    {
        Id = Guid.NewGuid();
        FighterOneInformation = new MatchInformation(fighterOne);
        FighterTwoInformation = new MatchInformation(fighterTwo);
        Date = date.ToUniversalTime();
    }
    
    //start properties
    public Guid Id { get; set; }

    public MatchInformation FighterOneInformation { get; set; }
    public MatchInformation FighterTwoInformation { get; set; }
    public DateTime Date { get; set; }

    private FightStatus _status;
    
    //end properties 
    public string Status
    {
        get => _status.ToString();
        set => _status = SetStatus(value) ;
    }
    

    private FightStatus SetStatus(string status)
    {
        if (Enum.TryParse<FightStatus>(status, out var result))
        {
            if (!ValidateStatusUpdate(result, out var err))

            {
                throw new FightSchoolServiceException(err);
            }

            if (result == FightStatus.Finalizado)
            {
                UpdateWinner();
            }

            return result;
        }
        throw new FightSchoolServiceException("Status Invalido");
    }

    private bool ValidateStatusUpdate(FightStatus status, out string error)
    {
        var defaultStatus = Enum.Parse<FightStatus>(Status);
        switch ( defaultStatus)
        {
            case FightStatus.Finalizado:
            {
                error = "Luta concluída, não pode ser atualizada";
                return false;
            }
            case FightStatus.Cancelado:
            {
                error = "Luta cancelada, não pode ser atualizada";
                return false;
            }
            default:
                break;
                    
        }
        if (status == FightStatus.Finalizado)
        {
            if (FighterOneInformation.VictoryBySubmission && FighterTwoInformation.VictoryBySubmission)
            {
                error = 
                    "Ambos lutadores finalizados, mas apenas um pode ser finalizado";
                return false;

            }

            if (!FighterOneInformation.VictoryBySubmission && !FighterTwoInformation.VictoryBySubmission &&
                FighterOneInformation.FighterScore == FighterTwoInformation.FighterScore &&
                FighterOneInformation.Punishments == FighterTwoInformation.Punishments)
            {
                error = "Luta empatada";
                return false;

            }

        }
        error = string.Empty;
        return true;
    }

    private void UpdateWinner()
    {
        if (!FighterOneInformation.VictoryBySubmission ||
            FighterOneInformation.FighterScore < FighterTwoInformation.FighterScore ||
            (FighterOneInformation.FighterScore == FighterTwoInformation.FighterScore &&
             FighterOneInformation.Punishments > FighterTwoInformation.FighterScore))
        {
            Winner = 2;
        }
        else
        {
            Winner = 1;
        }
    }

    public bool WasProcessed { get; set; } = false;

    public int Winner { get; private set; }
}

public class MatchInformation
{
    protected MatchInformation(){}
    public MatchInformation(User fighter)
    {
        User = fighter;
        UserId = fighter.Id;
    }
    public MatchInformation(Guid fighterId)
    {
        UserId = fighterId;
    }

    public User? User { get; set; }
    public Guid UserId { get; set; }
    public int FighterScore { get; set; } = 0;
    public int Punishments { get; set; } = 0;
    public bool VictoryBySubmission { get; set; }
}

public enum FightStatus
{
    Pendente,
    Finalizado,
    Cancelado,
    Expirado
}