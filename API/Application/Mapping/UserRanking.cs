using Application.DTO.UserRanking;
using AutoMapper;
using Domain.Entities;

namespace Application.Mapping;

public class UserRankingProfile : Profile
{
   public UserRankingProfile()
   {
       CreateMap<UserRanking, UserRankingResult>();
   }
}