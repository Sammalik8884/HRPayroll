using Application.Common;
using Application.DTOs.Designation;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRPayroll.API.Controllers
{
    [ApiController]
    [Route("api/designation")]
    [Authorize]
    public class DesignationController : ControllerBase
    {
        private readonly IDesignationService _designationService;
        public DesignationController(IDesignationService designationService)
        {
            _designationService = designationService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllDesignations()
        {
            var designations = await _designationService.GetAllAsync();
            if (designations == null) { return NotFound(); }


            return Ok(ApiResponse<List<DesignationDto>>.Ok(designations));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDesignationById(int id)
        {
            var designation = await _designationService.GetIdAsync(id);
            if (designation == null) { return NotFound(); }
            return Ok(ApiResponse<DesignationDto>.Ok(designation));
        }
        [HttpPost]
        public async Task<IActionResult> CreateDesignation([FromBody] CreateDesignationDto designationDto)
        {
            var createdDesignation = await _designationService.CreateAsync(designationDto);
            return CreatedAtAction(nameof(GetDesignationById), new { id = createdDesignation.Id }, ApiResponse<DesignationDto>.Ok(createdDesignation));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDesignation(int id, [FromBody] UpdateDesignationDto designationDto)
        {
            var updatedDesignation = await _designationService.UpdateAsync(id, designationDto);
            if (updatedDesignation == null) { return NotFound(); }
            return Ok(ApiResponse<DesignationDto>.Ok(updatedDesignation));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDesignation(int id)
        { try {
                await _designationService.DeleteAsync(id);

                return Ok(ApiResponse<string>.Ok("Designation deleted successfully"));
            }
            catch (Exception ex)
            {
                return NotFound(ApiResponse.Fail($"Error deleting designation: {ex.Message}"));
            }



        }
    }
}
