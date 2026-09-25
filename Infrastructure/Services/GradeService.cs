

using Application.DTOs.Grade;
using Application.Interfaces.Grade;
using Domain.Entities;
using Domain.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Services
{
    public class GradeService : IGradeService
    {
        private readonly IUnitOfWork _unitOfWork;
        public GradeService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<GradeDto>> GetAllAsync(CancellationToken ct = default)
        {
            var grade = await _unitOfWork.Repository<Grade>().GetAllAsync(ct);
            return grade.Select(g => new GradeDto
            {
                Id = g.Id,
                Name = g.Name,
                Description = g.Description,
                Code = g.Code,
                IsActive = g.IsActive,
                //here do we need the CreatedOn and CreatedBy properties? If yes, we need to add them to the Grade entity and map them here.
                CreatedBy = g.CreatedBy
            }).ToList();

        }
        public async Task<GradeDto> GetIdAsync(int id, CancellationToken ct = default)
        {
            var grade = await _unitOfWork.Repository<Grade>().GetIdAsync(id, ct);
            if (grade == null)
            {
                throw new Exception("Grade not found");
            }
            return new GradeDto
            {
                Id = grade.Id,
                Name = grade.Name,
                Description = grade.Description,
                Code = grade.Code,
                IsActive = grade.IsActive,
                CreatedBy = grade.CreatedBy
            };
        }
        public async Task<GradeDto> CreateAsync(CreateGradeDto createGradeDto, CancellationToken ct = default)
        {
            bool codeExists = await _unitOfWork.Repository<Grade>().AnyAsync(g => g.Code == createGradeDto.Code, ct);
            if (codeExists)
                throw new ValidationException("Grade code already exists,Code must be Unique!!!");
            var grade = new Grade
            {
                Name = createGradeDto.Name,
                Description = createGradeDto.Description,
                Code = createGradeDto.Code,
                IsActive = createGradeDto.IsActive
            };
            await _unitOfWork.Repository<Grade>().AddAsync(grade, ct);
            await _unitOfWork.CommitAsync(ct);
            return new GradeDto
            {
                Id = grade.Id,
                Name = grade.Name,
                Description = grade.Description,
                Code = grade.Code,
                IsActive = grade.IsActive,
                CreatedBy = grade.CreatedBy
            };
        }
        public async Task<GradeDto> UpdateAsync(int id, UpdateGradeDto updateGradeDto, CancellationToken ct = default)
        {
            var grade = await _unitOfWork.Repository<Grade>().GetIdAsync(id, ct);
            if (grade == null)
            {
                throw new Exception("Grade not found");
            }
            grade.Name = updateGradeDto.Name;
            grade.Description = updateGradeDto.Description;
            grade.Code = updateGradeDto.Code;
            grade.IsActive = updateGradeDto.IsActive;
            _unitOfWork.Repository<Grade>().Update(grade);
            await _unitOfWork.CommitAsync(ct);
            return new GradeDto
            {
                Id = grade.Id,
                Name = grade.Name,
                Description = grade.Description,
                Code = grade.Code,
                IsActive = grade.IsActive,
                CreatedBy = grade.CreatedBy
            };
        }
        public async Task DeleteAsync(int id, CancellationToken ct = default)
        {
            var grade = await _unitOfWork.Repository<Grade>().GetIdAsync(id, ct);
            if (grade == null)
            {
                throw new Exception("Grade not found");
            }
            _unitOfWork.Repository<Grade>().Delete(grade);
            await _unitOfWork.CommitAsync(ct);
        }
    }
}