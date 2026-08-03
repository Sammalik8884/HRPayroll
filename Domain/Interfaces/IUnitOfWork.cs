using Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<T> Repository<T>() where T : BaseEntity;
        Task<int> CommitAsync(CancellationToken ct = default);
        Task RollbackAsync();
    }
}
