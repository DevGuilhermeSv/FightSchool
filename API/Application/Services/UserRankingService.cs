using Application.DTO.UserRanking;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
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
}