using Application.DTOs.Grade;

namespace Application.Interfaces.Grade
{
    public interface IGradeService
    {
        public Task<List<GradeDto>> GetAllAsync(CancellationToken ct = default);
        public Task<GradeDto> GetIdAsync(int id, CancellationToken ct = default);
        public Task<GradeDto> CreateAsync(CreateGradeDto CreateGradedto, CancellationToken ct = default);
        public Task<GradeDto> UpdateAsync(int id, UpdateGradeDto updateGradeDto, CancellationToken ct = default);
        public Task DeleteAsync(int id, CancellationToken ct = default);
    }
}
