using Application.DTOs.Company;

namespace Application.Interfaces
{
    public interface ICompanyService
    {
        public Task<List<CompanyDto>> GetAllAsync(CancellationToken ct=default);
        public Task<CompanyDto>GetIdAsync(int id, CancellationToken ct = default);
        public Task<CompanyDto> CreateAsync(CreateCompanyDto CreateCompanydto, CancellationToken ct = default);
        public Task<CompanyDto> UpdateAsync(int id, UpdateCompanyDto UpdateCompanydto, CancellationToken ct = default);
        public Task DeleteAsync(int id, CancellationToken ct = default);
    }
}
