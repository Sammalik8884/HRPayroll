

using Application.Interfaces;

namespace Infrastructure.Services
{
    public class PasswordHasher : IPasswordHasher
    {
        public bool Verify(string plainPassword, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(plainPassword, hash);
        }
        public string Hash(string plainPassword)
        {
            return BCrypt.Net.BCrypt.HashPassword(plainPassword, workFactor: 12);
        }


    }
}
