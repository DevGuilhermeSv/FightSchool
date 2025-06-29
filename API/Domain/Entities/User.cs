namespace Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Nickname { get; set; }
    public string PhoneNumber { get; set; }
    private Belt _belt;
    
    public string Belt
    {
        get => _belt.ToString();
        set => _belt = Enum.Parse<Belt>(value);
    }

    public DateTime CreatedAt { get; set; }
}

public enum Belt
{
    Branca,
    Amarela,
    Cinza,
    Verde,
    Azul,
    Marrom,
    Preta,
    Coral
}