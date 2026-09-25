using Application.Common;
using Application.DTOs.Grade;
using Application.Interfaces.Grade;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace HRPayroll.API.Controllers
{
    [ApiController]
    [Route("api/grade")]
    [Authorize]
    public class GradeController : ControllerBase
    {
        private readonly IGradeService _gradeService;
        public GradeController(IGradeService gradeService)
        {
            _gradeService = gradeService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllGrades()
        { 
            var grades = await _gradeService.GetAllAsync();
            if(grades == null || !grades.Any())
            {
                return NotFound();
            }
            return Ok(ApiResponse<List<GradeDto>>.Ok(grades));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGradeById(int id)
        {
            var grade = await _gradeService.GetIdAsync(id);
            if (grade == null)
            {
                return NotFound();
            }
            return Ok(ApiResponse<GradeDto>.Ok(grade));
        }
        [HttpPost]
        public async Task<IActionResult> CreateGrade([FromBody] CreateGradeDto gradeDto)
        {
            var createdGrade = await _gradeService.CreateAsync(gradeDto);
            return CreatedAtAction(nameof(GetGradeById), new { id = createdGrade.Id }, ApiResponse<GradeDto>.Ok(createdGrade));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGrade(int id, [FromBody] UpdateGradeDto gradeDto)
        {
            var updatedGrade = await _gradeService.UpdateAsync(id, gradeDto);
            if (updatedGrade == null)
            {
                return NotFound();
            }
            return Ok(ApiResponse<GradeDto>.Ok(updatedGrade));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrade(int id)
        {
            try {
                await _gradeService.DeleteAsync(id);
                return Ok(ApiResponse.OkNoData("Company deleted successfully"));
            }
             
           catch (Exception ex)
            {
                return NotFound(ApiResponse.Fail(ex.Message));
            }
        }


    }
}
