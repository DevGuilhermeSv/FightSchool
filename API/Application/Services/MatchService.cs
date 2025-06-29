using Application.DTO.Match;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

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


        public Task<List<Match>> SearchMatchesAsync(SearchMatch searchMatch)
        {
            var query = _matchRepository.GetAll();
                
                query = _matchRepository.Filter(query, "FightStatus", searchMatch.FightStatus.ToString());
                query = _matchRepository.Filter(query, "Date", searchMatch.Date);
                
            return Task.FromResult(query.ToList());
        }

        public Match? GetMatchByIdAsync(Guid id)
        {
            return _matchRepository.GetById(id);
        }

        public async Task<IEnumerable<Match>> GetMatchesByUserIdAsync(Guid userId)
        {
            return await _matchRepository.GetMatchesByUserIdAsync(userId);
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