using Application.DTO.User;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<User>_userManager;

        public UserService(IUserRepository userRepository, IMapper mapper, UserManager<User> userManager)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _userManager = userManager;
        }
        public async Task CreateUser(CreateUser model)
        {
            var user = _mapper.Map<User>(model);

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                throw new FightSchoolServiceException(result.Errors.First().Description);
            }
        }

        public async Task<List<GetUser>> Search(UserDto userDto)
        {
            var query = _userRepository.GetAll();

            query = _userRepository.Filter(query, "PhoneNumber", userDto.PhoneNumber);

            query = _userRepository.Filter(query, "Nickname", userDto.UserName);

            query = _userRepository.Filter(query, "Belt", userDto.Belt.ToString());
            query = _userRepository.Filter(query, "Name", userDto.Name);

            var usersQuery = _mapper.ProjectTo<GetUser>(query);
            return usersQuery.ToList();
        }

        public async Task<GetUser?> GetById(Guid id)
        {
            return await Task.Run(() =>
            {
                var user = _userRepository.GetById(id);
                return user == null ? null : _mapper.Map<GetUser>(user);
            });
        }

        public async Task<GetUser?> FindUserByEmail(string email)
        {
            var userExists = await _userManager.FindByEmailAsync(email);
            return userExists == null ? null : _mapper.Map<GetUser>(userExists);
            
        }
    }
}