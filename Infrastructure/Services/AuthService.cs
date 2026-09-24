

using Application.DTOs.Auth;
using Application.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;


namespace Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _uow;
        private readonly IJwtService _jwt;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ICurrentUserService _currentUserService;
        public AuthService(IUnitOfWork uow, IJwtService jwtService, IPasswordHasher passwordHasher, ICurrentUserService currentUserService)
        {
            _passwordHasher = passwordHasher;
            _uow = uow;
            _jwt = jwtService;
            _currentUserService = currentUserService;
        }
        public async Task<LoginResponseDto> LoginAsync(LoginRequestDto dto)
        {
            var user = await _uow.Repository<User>().FirstOrDefaultAsync(x => x.Email == dto.Email);
            if (user == null) {

                throw new NotFoundException("User", dto.Email);
            }
            bool isValid = _passwordHasher.Verify(dto.Password, user.PasswordHash);
            if (!isValid)
                throw new UnauthorizedException  ("Invalid credentials");

            if (!user.IsActive)
                throw new UnauthorizedException("Account is suspended");
            var accesstoken = _jwt.GenerateAccessToken(user);
            var refreshToken = _jwt.GenerateRefreshToken();
            user.RefreshToken = _passwordHasher.Hash(refreshToken);
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            _uow.Repository<User>().Update(user);
            await _uow.CommitAsync();
            return new LoginResponseDto
            {
                AccessToken = accesstoken,
                RefreshToken = refreshToken,
                ExpiresAt = DateTime.UtcNow.AddMinutes(15),
                UserId = user.Id,
                FullName = user.FullName,
                Email = user.Email
            };
            // so here we are returning the dto that is why we used in task as dto
        }

        public async Task RegisterAsync(RegisterRequestDto dto) 
        {
            var emailExist =await  _uow.Repository<User>().AnyAsync(x=>x.Email==dto.Email);
            if (emailExist) 
                throw new ValidationException("Email already exist!!!",new List<string> {"Email already registered" });
            
           

                var user = new User
                {
                    FullName = dto.FullName,
                    Email = dto.Email,
                    PasswordHash = _passwordHasher.Hash(dto.Password),
                    IsActive = true

                };
              await  _uow.Repository<User>().AddAsync(user);// when to use and why to use _uow.Repository<User>()
             await  _uow.CommitAsync();
                
        }
        public async Task<LoginResponseDto> RefreshTokenAsync(string refreshToken)
        { 
           var user = await _uow.Repository<User>().FirstOrDefaultAsync(x => x.RefreshToken != null && x.RefreshTokenExpiry > DateTime.UtcNow);
            if (user == null)
                throw new UnauthorizedException("Invalid or expired refresh token");

            if (!_passwordHasher.Verify(refreshToken, user.RefreshToken!))
                throw new UnauthorizedException("Invalid refresh token");
            var accessToken = _jwt.GenerateAccessToken(user);
            var refreshTokens = _jwt.GenerateRefreshToken();// what should be here?
            user.RefreshToken = _passwordHasher.Hash(refreshTokens);
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            _uow.Repository<User>().Update(user);
           await  _uow.CommitAsync();
            return new LoginResponseDto
            {
                FullName = user.FullName,
                UserId = user.Id,
                AccessToken = accessToken,
                RefreshToken = refreshTokens,
                Email = user.Email,
                ExpiresAt = DateTime.UtcNow.AddMinutes(15)
            };
        }
        public async Task LogoutAsync( string refreshToken)
        {
            var users = int.Parse(_currentUserService.UserId);
            var user= await _uow.Repository<User>().GetIdAsync(users);
            if (user == null)
                throw new NotFoundException("User", users);
            user.RefreshToken = null;
            user.RefreshTokenExpiry = null;
            _uow.Repository<User>().Update(user);
            await _uow.CommitAsync();
        }


    }
}
