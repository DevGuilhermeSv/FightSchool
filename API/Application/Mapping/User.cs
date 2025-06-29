using Application.DTO.User;
using AutoMapper;
using Domain.Entities;

namespace Application.Mapping;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>()
            .ForMember(dest => dest.Belt, opt => opt.MapFrom(src => Enum.Parse<Belt>(src.Belt)))
            .ReverseMap();
        CreateMap<CreateUser, User>();
        CreateMap<User, GetUser>()
            .IncludeBase<User, UserDto>();
    }
}