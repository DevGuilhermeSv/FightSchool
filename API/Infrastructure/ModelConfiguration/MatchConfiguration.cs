using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.ModelConfiguration;

public static class MatchConfiguration
{
    public static void Configure(ModelBuilder modelBuilder)
    {
        var entity = modelBuilder.Entity<Match>();
        entity.OwnsOne(x => x.FighterOneInformation);
        entity.OwnsOne(x => x.FighterTwoInformation);
    }
}