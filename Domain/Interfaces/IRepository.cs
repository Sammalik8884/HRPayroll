using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Domain.Interfaces
{
    public interface IRepository<T>  where T : BaseEntity
    {
        Task<T? > GetIdAsync(int id, CancellationToken ct = default);
        Task<List<T>> GetAllAsync(CancellationToken ct = default);
        Task AddAsync(T entity, CancellationToken ct = default);
        void Update(T entity);
        void Delete(T entity);
        Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate, CancellationToken ct = default);
        Task<List<T>> FindAsync(Expression<Func<T, bool>> predicate, CancellationToken ct = default);
        Task<bool> AnyAsync(Expression<Func<T, bool>> predicate, CancellationToken ct = default);
        Task<int> CountAsync(Expression<Func<T, bool>> predicate, CancellationToken ct = default);
        Task <(List<T>items,int Count)> GetPagedAsync(Expression <Func<T,bool>>predicate,int page, int pageSize, CancellationToken ct=default  );

    }
}
