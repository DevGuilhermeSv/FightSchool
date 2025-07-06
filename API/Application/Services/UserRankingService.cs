using Application.DTO.UserRanking;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class UserRankingService : IUserRankingService
{
    private readonly IUserRankingRepository _userRankingRepository;
    private readonly IMapper _mapper;

    public UserRankingService(IUserRankingRepository userRankingRepository, IMapper mapper)
    {
        _userRankingRepository = userRankingRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<UserRankingResult>> GetRankingsAsync(string? belt = null)
    {
        IQueryable<UserRanking> rankings;

        if (!string.IsNullOrEmpty(belt) && Enum.TryParse(belt, true, out Belt parsedBelt))
        {
            rankings = _userRankingRepository.GetUserRankingsByBelt(parsedBelt);
        }
        else
        {
            rankings = _userRankingRepository.GetAll();
        }

        // Apply sorting: Victories (desc), then Points (desc), then Defenses (asc for fewer defeats)
        rankings = rankings.OrderByDescending(r => r.Victories)
            .ThenByDescending(r => r.Points)
            .ThenBy(r => r.Defenses);
        var result = _mapper.ProjectTo<UserRankingResult>(rankings);
        return await result.ToListAsync();
    }

    public async Task UpdateScore(Match match)
    {
        if (match.WasProcessed) throw new FightSchoolServiceException("Luta ja contabilizada");
      
        var task1 = _userRankingRepository.GetByUserId(match.FighterOneId);
        var task2 = _userRankingRepository.GetByUserId(match.FighterTwoId);
        var userRankings = await Task.WhenAll(task1, task2);

        if (userRankings.Any(x => x == null))
        {
            throw new FightSchoolNotFoundException("Lutador não encontrado");
        }
        var userRanking1 = userRankings.FirstOrDefault();
        var userRanking2 = userRankings.Skip(1).FirstOrDefault();
        
        if (match.FighterOneScore > match.FighterTwoScore)
        {
            userRanking1.Victories++;
            userRanking2.Defenses++;
        }
        else
        {
            userRanking2.Victories++;
            userRanking1.Defenses++;
        }

        userRanking1.Points += match.FighterOneScore;
        userRanking2.Points += match.FighterTwoScore;

        _userRankingRepository.Update(userRanking1);
        _userRankingRepository.Update(userRanking2);
        _userRankingRepository.SaveChanges();
    }
}