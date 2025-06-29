using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public class User : IdentityUser<Guid>
{
    private Belt _belt;
    
    public string Belt
    {
        get => _belt.ToString();
        set => _belt = Enum.Parse<Belt>(value);
    }

    public string Name { get; set; }
}

public enum Belt
{
    Branca,
    Amarela,
    Cinza,
    Verde,
    Azul,
    Roxa,
    Marrom,
    Preta,
    Coral
}