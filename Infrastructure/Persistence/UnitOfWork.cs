

using Domain.Common;
using Domain.Interfaces;

namespace Infrastructure.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly HRPayrollDbContext _dbContext;
        public UnitOfWork(HRPayrollDbContext dbContext) 
        {
            _dbContext = dbContext;

        }

        public IRepository<T> Repository<T>() where T : BaseEntity 
        {
            return new Repository<T>(_dbContext);
        }
        public async Task<int> CommitAsync(CancellationToken ct = default)
        {
            return await _dbContext.SaveChangesAsync(ct);
        }
        public Task RollbackAsync()
        {

            _dbContext.ChangeTracker.Clear();
            return Task.CompletedTask;
        }
        public void  Dispose()
        {
            _dbContext.Dispose();
        }
    }
}
