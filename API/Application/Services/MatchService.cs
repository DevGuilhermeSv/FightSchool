using Application.DTO.Match;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class MatchService : IMatchService
    {
        private readonly IMatchRepository _matchRepository;
        private readonly IUserRepository _userRepository;
        private readonly IUserRankingService _userRankingService;
        private readonly IMapper _mapper;

        public MatchService(IMatchRepository matchRepository, IMapper mapper, IUserRankingService userRankingService, IUserRepository userRepository)
        {
            _matchRepository = matchRepository;
            _mapper = mapper;
            _userRankingService = userRankingService;
            _userRepository = userRepository;
        }


        public async Task<List<MatchResponse>> SearchMatchesAsync(SearchMatch searchMatch)
        {
            var query = _matchRepository.GetAll();
                
                query = _matchRepository.Filter(query, "Status", searchMatch.FightStatus.ToString());
                query = _matchRepository.Filter(query, "_minDate", searchMatch._minDate);
                query = _matchRepository.Filter(query, "_maxDate", searchMatch._maxDate);
                
            var result =_mapper.ProjectTo<MatchResponse>(query.AsNoTracking());
                
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
            var user1 = _userRepository.GetById(createMatch.FighterOneId);
            if(user1 == null)
                throw new NullReferenceException("Lutador 1 não encontrado");
            var user2 = _userRepository.GetById(createMatch.FighterTwoId);
            if (user2 == null)
                throw new NullReferenceException("Lutador 2 não encontrado");

            var match = new Match(user1, user2, createMatch.Date);
            await _matchRepository.AddAsync(match);
            _matchRepository.SaveChanges();
            return match.Id;
        }

        public async Task UpdateMatchAsync(UpdateMatch updateMatch)
        {
            var existingMatch = _matchRepository.GetById(updateMatch.Id);
            if (existingMatch == null) throw new KeyNotFoundException("Match not found");

            

            _mapper.Map(updateMatch, existingMatch);
            

            if (updateMatch.FightStatus == FightStatus.Finalizado)
            {
                try
                {
                    await _userRankingService.UpdateScore(existingMatch);
                    existingMatch.WasProcessed = true;

                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
            
            _matchRepository.Update(existingMatch);
            _matchRepository.SaveChanges();

        }
        
        
    }



  
}