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
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<FightStatus>(src.Status)))
            .ForMember(dest => dest.FighterOne, opt => opt.MapFrom(src => src.FighterOneInformation.User))
            .ForMember(dest => dest.FighterTwo, opt => opt.MapFrom(src => src.FighterTwoInformation.User))
            .ForMember(dest => dest.FighterOneScore, opt => opt.MapFrom(src => src.FighterOneInformation.FighterScore))
            .ForMember(dest => dest.FighterTwoScore, opt => opt.MapFrom(src => src.FighterTwoInformation.FighterScore));

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
    }
}