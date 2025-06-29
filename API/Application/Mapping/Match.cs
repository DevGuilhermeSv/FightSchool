using System.Text.RegularExpressions;
using Application.DTO.Match;
using AutoMapper;
using Match = Domain.Entities.Match;

namespace Application.Mapping;

public class MatchProfile : Profile
{
    public MatchProfile()
    {
        CreateMap<CreateMatch, Match>();

        CreateMap<UpdateMatch, Match>()
            .ForAllMembers(dest => dest.Condition((src, destMember, srcMember) => srcMember != null));
    }
}