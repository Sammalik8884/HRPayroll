

using Domain.Entities;
using System.Security.Claims;

namespace Application.Interfaces
{
    public interface IJwtService
    {
        public string GenerateAccessToken(User user);
        public string GenerateRefreshToken();
        public ClaimsPrincipal? ValidateToken(string token);
    }
}
