using Application.DTO.Match;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class MatchService : IMatchService
    {
        private readonly IMatchRepository _matchRepository;
        private readonly IMapper _mapper;

        public MatchService(IMatchRepository matchRepository, IMapper mapper)
        {
            _matchRepository = matchRepository;
            _mapper = mapper;
        }


        public async Task<List<MatchResponse>> SearchMatchesAsync(SearchMatch searchMatch)
        {
            var query = _matchRepository.GetAll();
                
                query = _matchRepository.Filter(query, "Status", searchMatch.FightStatus.ToString());
                query = _matchRepository.Filter(query, "_minDate", searchMatch._minDate);
                query = _matchRepository.Filter(query, "_maxDate", searchMatch._maxDate);

            var result =_mapper.ProjectTo<MatchResponse>(query);
                
            return await result.ToListAsync();
        }

        public MatchResponse? GetMatchByIdAsync(Guid id)
        {
            var match = _matchRepository.GetById(id);
            
            return match == null ? null : _mapper.Map<MatchResponse>(match);
        }

        public async Task<IEnumerable<MatchResponse>> GetMatchesByUserIdAsync(Guid userId)
        {
            var match =  _matchRepository.GetMatchesByUserIdAsync(userId);
            return await _mapper.ProjectTo<MatchResponse>(match).ToListAsync();
        }

        public async Task<Guid> CreateMatchAsync(CreateMatch createMatch)
        {
            var match = _mapper.Map<Match>(createMatch);
            await _matchRepository.AddAsync(match);
            _matchRepository.SaveChanges();
            return match.Id;
        }

        public async Task UpdateMatchAsync(UpdateMatch match)
        {
            var existingMatch = _matchRepository.GetById(match.Id);
            if (existingMatch == null) throw new KeyNotFoundException("Match not found");

            _mapper.Map(match, existingMatch);
            _matchRepository.Update(existingMatch);

            _matchRepository.SaveChanges();
        }
    }



  
}