using Domain.Common;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
namespace Infrastructure.Persistence
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly HRPayrollDbContext _dbContext;
        private readonly DbSet<T> _dbset;
        public Repository(HRPayrollDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbset = dbContext.Set<T>();
        }
        public async Task<T?> GetIdAsync(int id, CancellationToken ct = default)
        {
            return await _dbset.FindAsync(new object[] { id }, ct);
        }
        public async Task AddAsync(T entity, CancellationToken ct = default)
        {
            await _dbset.AddAsync(entity, ct);

        }
        public void Update(T entity)
        {
            _dbset.Update(entity);
        }
        public void Delete(T entity)
        {

            _dbset.Remove(entity);
        }

        public async Task<T?> FirstOrDefaultAsync(
    Expression<Func<T, bool>> predicate,
    CancellationToken ct = default)
        {
            return await _dbset.FirstOrDefaultAsync(predicate, ct);

        }
        public async Task<List<T>> FindAsync(
        Expression<Func<T, bool>> predicate,
        CancellationToken ct = default)
        {
            return await _dbset.Where(predicate).ToListAsync(ct);
        }
        public async Task<bool> AnyAsync(
        Expression<Func<T, bool>> predicate,
        CancellationToken ct = default)
        {
            return await _dbset.AnyAsync(predicate, ct);
        }
        public async Task<int> CountAsync(
                 Expression<Func<T, bool>> predicate,
                 CancellationToken ct = default)
        {
            return await _dbset.CountAsync(predicate, ct);
        }

        public async Task<(List<T> items, int Count)> GetPagedAsync(
        Expression<Func<T, bool>> predicate,
        int page,
        int pageSize,
        CancellationToken ct = default)
            {
            var query = _dbset.Where(predicate);

            var Count = await query.CountAsync(ct);

            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(ct);

            return (items, Count);
        }
        public async Task<List<T>> GetAllAsync(CancellationToken ct = default)
        {
            return await _dbset.ToListAsync(ct);
        }
    }
}
