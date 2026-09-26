using Application.DTOs.Designation;
using Application.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Infrastructure.Services
{
    public class DesignationService : IDesignationService
    {
        private readonly IUnitOfWork _UnitOfWork;
        public DesignationService(IUnitOfWork unitOfWork)
        {
            _UnitOfWork = unitOfWork;
        }
        public async Task<List<DesignationDto>> GetAllAsync(CancellationToken ct = default)
        {
            var designations = await _UnitOfWork.Repository<Designation>().GetAllAsync(ct);
            return designations.Select(d => new DesignationDto
            {
                Id = d.Id,
                Name = d.Name,
                Description = d.Description ?? string.Empty,
                IsActive = d.IsActive
            }).ToList();
        }
        public async Task<DesignationDto> GetIdAsync(int id, CancellationToken ct = default)
        {
            var designation = await _UnitOfWork.Repository<Designation>().GetIdAsync(id, ct);
            if (designation == null)
            {
                throw new Exception("Designation not found");
            }
            return new DesignationDto
            {
                Id = designation.Id,
                Name = designation.Name,
                Description = designation.Description ?? string.Empty,
                IsActive = designation.IsActive
            };
        }
        public async Task<DesignationDto> CreateAsync(CreateDesignationDto createDesignationDto, CancellationToken ct = default)
        {
            var designation = new Designation
            {
                Name = createDesignationDto.Name,
                Description = createDesignationDto.Description
            };
            await _UnitOfWork.Repository<Designation>().AddAsync(designation, ct);
            await _UnitOfWork.CommitAsync(ct);
            return new DesignationDto
            {
                Id = designation.Id,
                Name = designation.Name,
                Description = designation.Description ?? string.Empty,
                IsActive = designation.IsActive
            };
        }
        public async Task<DesignationDto> UpdateAsync(int id, UpdateDesignationDto updateDesignationDto, CancellationToken ct = default)
        {
            var designation = await _UnitOfWork.Repository<Designation>().GetIdAsync(id, ct);
            if (designation == null)
            {
                throw new Exception("Designation not found");
            }
            designation.Name = updateDesignationDto.Name;
            designation.Description = updateDesignationDto.Description;
            designation.IsActive = updateDesignationDto.IsActive;
            _UnitOfWork.Repository<Designation>().Update(designation);
            await _UnitOfWork.CommitAsync(ct);
            return new DesignationDto
            {
                Id = designation.Id,
                Name = designation.Name,
                Description = designation.Description ?? string.Empty,
                IsActive = designation.IsActive
            };
        }
        public async Task DeleteAsync(int id, CancellationToken ct = default)
        { 

            var designation = await _UnitOfWork.Repository<Designation>().GetIdAsync(id, ct);
            if (designation == null)
                throw new NotFoundException("Designation not found");
            _UnitOfWork.Repository<Designation>().Delete(designation);
            await _UnitOfWork.CommitAsync(ct);
        }

    }
}
