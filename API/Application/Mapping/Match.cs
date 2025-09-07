using System.Text.RegularExpressions;
using Application.DTO.Match;
using AutoMapper;
using Domain.Entities;
using Match = Domain.Entities.Match;

namespace Application.Mapping;

public class MatchProfile : Profile
{
    public MatchProfile()
    {
        CreateMap<Match, MatchResponse>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<FightStatus>(src.Status)));
        
        CreateMap<CreateMatch, Match>()
            .ForMember(dest => dest.FighterOneInformation,
                opt => opt.MapFrom(src => new MatchInformation(src.FighterOneId)))
            .ForMember(dest => dest.FighterTwoInformation,
                opt => opt.MapFrom(src => new MatchInformation(src.FighterTwoId)));

        CreateMap<UpdateMatch, Match>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.FightStatus.ToString()))
            .ForAllMembers(dest => dest.Condition((src, destMember, srcMember) => srcMember != null));

        CreateMap<MatchInformationDto, MatchInformation>()
            .ForMember(dest => dest.User, opt => opt.Ignore());
        CreateMap<MatchInformation, MatchInformationResponse>();
    }
}