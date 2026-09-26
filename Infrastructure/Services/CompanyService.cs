
using Application.DTOs.Company;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;


namespace Infrastructure.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly IUnitOfWork _unitOfWork;
       
        public CompanyService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            
        }
        public async Task<List<CompanyDto>> GetAllAsync(CancellationToken ct = default)
        {
            var companies = await _unitOfWork.Repository<Company>().GetAllAsync(ct);
            return companies.Select(c => new CompanyDto
            {
                Id = c.Id,
                Name = c.Name,
                Address = c.Address??string.Empty,
                Phone = c.Phone??string.Empty,
                Email = c.Email??string.Empty,
                LogoPath = c.LogoPath??string.Empty,
                IsActive = c.IsActive
            }).ToList();
        }
        public async Task<CompanyDto> GetIdAsync(int id, CancellationToken ct = default)
        {
            var company = await _unitOfWork.Repository<Company>().GetIdAsync(id, ct);
            if (company == null)
            {
              throw new Exception("Company not found");
            }
            return new CompanyDto
            {
                Id = company.Id,
                Name = company.Name,
                Address = company.Address??string.Empty,
                Phone = company.Phone??string.Empty,
                Email = company.Email??string.Empty,
                LogoPath = company.LogoPath??string.Empty,
                IsActive = company.IsActive
            };
        }
        public async Task<CompanyDto> CreateAsync(CreateCompanyDto CreateCompanydto, CancellationToken ct = default)
        {
            var company =  new Company
            {
                Name = CreateCompanydto.Name,
                Address = CreateCompanydto.Address,
                Phone = CreateCompanydto.Phone,
                Email = CreateCompanydto.Email,
                LogoPath = CreateCompanydto.LogoPath
            };
            await _unitOfWork.Repository<Company>().AddAsync(company, ct);
            await _unitOfWork.CommitAsync(ct);
          return  new CompanyDto
          {
              Id=company.Id,
              Name = company.Name,
              Address = company.Address,
              Phone = company.Phone,
              Email = company.Email,
              LogoPath = company.LogoPath,
             IsActive=company.IsActive
          };

        }
        public async Task<CompanyDto> UpdateAsync(int id, UpdateCompanyDto UpdateCompanydto, CancellationToken ct = default)
        {
            var company = await _unitOfWork.Repository<Company>().GetIdAsync(id, ct);
            if (company == null)
            {
                throw new Exception("Company not found");
            }
            company.Name = UpdateCompanydto.Name;
            company.Address = UpdateCompanydto.Address;
            company.Phone = UpdateCompanydto.Phone;
            company.Email = UpdateCompanydto.Email;
            company.LogoPath = UpdateCompanydto.LogoPath;
            company.IsActive = UpdateCompanydto.IsActive;
            _unitOfWork.Repository<Company>().Update(company);
            await _unitOfWork.CommitAsync(ct);
            return new CompanyDto
            {
                Id = company.Id,
                Name = company.Name,
                Address = company.Address,
                Phone = company.Phone,
                Email = company.Email,
                LogoPath = company.LogoPath,
                IsActive = company.IsActive
            };
        }
        public async Task DeleteAsync(int id,CancellationToken ct=default)
        {
            var company = await _unitOfWork.Repository<Company>().GetIdAsync(id,ct);
            if (company == null)
            {
                throw new Exception("Company not found");
            }
            _unitOfWork.Repository<Company>().Delete(company);
            await _unitOfWork.CommitAsync(ct);
        }

    }
}
