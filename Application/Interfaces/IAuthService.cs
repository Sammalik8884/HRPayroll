

using Application.DTOs.Auth;

namespace Application.Interfaces
{
    public interface IAuthService
    {
        public Task<LoginResponseDto> LoginAsync(LoginRequestDto dto);
        public Task RegisterAsync(RegisterRequestDto dto);
        public Task<LoginResponseDto> RefreshTokenAsync(string refreshToken);
        public Task LogoutAsync(string refreshToken);
    }
}
