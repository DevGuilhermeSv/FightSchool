using Application.DTO.User;
using Application.Services;
using Domain.Entities;

namespace Application.Interfaces;

public interface IUserInterface
{
    Task<bool> Create(CreateUser userDto);
    Task<List<GetUser>> Search(UserDto userDto);
    Task<GetUser?> GetById(Guid id);
}