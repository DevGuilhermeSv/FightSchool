using Application.DTO.User;
using Application.Services;
using Domain.Entities;

namespace Application.Interfaces;

public interface IUserService
{
    Task<List<GetUser>> Search(UserDto userDto);
    Task<GetUser?> GetById(Guid id);
    Task<GetUser?> FindUserByEmail(string email);
    Task CreateUser(CreateUser model);
}