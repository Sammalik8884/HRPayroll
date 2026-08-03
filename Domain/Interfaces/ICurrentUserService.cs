using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Interfaces
{
    public interface ICurrentUserService
    {
        string UserId { get; }
        string UserName { get; }
        string Email { get; }
        bool IsAuthenticated { get; }
    }
}
