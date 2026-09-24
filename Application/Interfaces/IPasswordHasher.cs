

namespace Application.Interfaces
{
    public interface IPasswordHasher
    {
        public string  Hash(string plainPassword);
        public bool Verify(string plainPassword, string hash);
    }
}
