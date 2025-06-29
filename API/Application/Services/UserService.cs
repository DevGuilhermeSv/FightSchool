using Application.DTO.User;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Services
{
    public class UserService : IUserInterface
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<bool> Create(CreateUser userDto)
        {
            var validate = await new CreateUserValidator().ValidateAsync(userDto);
            if (!validate.IsValid)
                throw new ValidationException(validate.Errors);
                
            var userEntity = _mapper.Map<User>(userDto);
            userEntity.Id = Guid.NewGuid();
            userEntity.CreatedAt = DateTime.UtcNow;

            var existingUser = await _userRepository.FindByNicknameAndPhoneNumber(
                userDto.Nickname,
                userDto.PhoneNumber
            );

            if (existingUser != null)
            {
                return false;
            }

            await _userRepository.AddAsync(userEntity);
            _userRepository.SaveChanges();
            return true;
        }

        public async Task<List<GetUser>> Search(UserDto userDto)
        {
            var query = _userRepository.GetAll();

            query = _userRepository.Filter(query, "PhoneNumber", userDto.PhoneNumber);

            query = _userRepository.Filter(query, "Nickname", userDto.Nickname);

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
    }
}