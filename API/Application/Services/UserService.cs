using Application.DTO.User;
using Application.Interfaces;
using AutoMapper;
using Domain.Interfaces;

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