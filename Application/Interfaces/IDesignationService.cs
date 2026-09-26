

using Application.DTOs.Designation;

namespace Application.Interfaces
{
    public interface IDesignationService
    {
        public  Task<List<DesignationDto>> GetAllAsync(CancellationToken ct=default);
        public Task<DesignationDto> GetIdAsync(int id, CancellationToken ct = default);
        public Task<DesignationDto> CreateAsync(CreateDesignationDto createDesignationDto, CancellationToken ct = default);
        public Task<DesignationDto> UpdateAsync(int id, UpdateDesignationDto updateDesignationDto, CancellationToken ct = default);
        public Task DeleteAsync(int id, CancellationToken ct = default);

    }
}
