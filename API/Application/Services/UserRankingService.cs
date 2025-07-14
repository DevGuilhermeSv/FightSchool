using Application.DTO.Match;
using Application.DTO.UserRanking;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class UserRankingService : IUserRankingService
{
    private readonly IUserRankingRepository _userRankingRepository;
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public UserRankingService(IUserRankingRepository userRankingRepository, IMapper mapper, IUserService userService)
    {
        _userRankingRepository = userRankingRepository;
        _mapper = mapper;
        _userService = userService;
    }

    public async Task<IEnumerable<UserRankingResponse>> GetRankingsAsync(string? belt = null)
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
        var result = _mapper.ProjectTo<UserRankingResponse>(rankings);
        return await result.ToListAsync();
    }

    public async Task<UserRankingResponse> Create(Guid userId)
    {
        var user = await _userService.GetById(userId);
        if (user == null) throw new FightSchoolNotFoundException("Usuário não encontrado");

        var userRanking = new UserRanking(user.Id, 0, 0, 0);
        await _userRankingRepository.AddAsync(userRanking);
        
        _userRankingRepository.SaveChanges();
        
        return _mapper.Map<UserRankingResponse>(userRanking);
        
    }

    public async Task UpdateScore(Match match)
    {
        if (match.WasProcessed) throw new FightSchoolServiceException("Luta ja contabilizada");

        var task1 = _userRankingRepository.GetByUserId(match.FighterOneInformation.UserId);
        var task2 = _userRankingRepository.GetByUserId(match.FighterTwoInformation.UserId);
        var userRankings = await Task.WhenAll(task1, task2);

        if (userRankings.Any(x => x == null))
        {
            throw new FightSchoolNotFoundException("Lutador não possui ranking cadastrado");
        }

        var userRanking1 = userRankings.FirstOrDefault();
        var userRanking2 = userRankings.Skip(1).FirstOrDefault();

        if (match.FighterOneInformation.FighterScore > match.FighterTwoInformation.FighterScore)
        {
            userRanking1.Victories++;
            userRanking2.Defenses++;
        }
        else
        {
            userRanking2.Victories++;
            userRanking1.Defenses++;
        }

        userRanking1.Points += match.FighterOneInformation.FighterScore;
        userRanking2.Points += match.FighterTwoInformation.FighterScore;

        _userRankingRepository.Update(userRanking1);
        _userRankingRepository.Update(userRanking2);
        _userRankingRepository.SaveChanges();
    }
}