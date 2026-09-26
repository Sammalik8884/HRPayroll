using Application.Common;
using Application.DTOs.Company;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRPayroll.API.Controllers
{
    [ApiController]
    [Route("api/companies")]
    [Authorize]
    public class CompanyController : ControllerBase
    {
        
        private readonly ICompanyService _companyService;
       public CompanyController ( ICompanyService companyService)
        {
            
            _companyService = companyService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCompanies()
        {
            var companies = await _companyService.GetAllAsync();
            if (companies == null || !companies.Any())
            {
                return NotFound();
            }
            return Ok(ApiResponse<List<CompanyDto>>.Ok(companies));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompanyById(int id)
        {
            var company = await _companyService.GetIdAsync(id);
            if (company == null)
            {
                return NotFound();
            }
            return Ok(ApiResponse<CompanyDto>.Ok(company));
        }
        [HttpPost]
        public async Task<IActionResult> CreateCompany([FromBody] CreateCompanyDto companyDto)
        {
            var createdCompany = await _companyService.CreateAsync(companyDto);
            return CreatedAtAction(nameof(GetCompanyById), new { id = createdCompany.Id }, ApiResponse<CompanyDto>.Ok(createdCompany));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(int id, [FromBody] UpdateCompanyDto companyDto)
        {
            var updatedCompany = await _companyService.UpdateAsync(id, companyDto);
            if (updatedCompany == null)
            {
                return NotFound();
            }
            return Ok(ApiResponse<CompanyDto>.Ok(updatedCompany));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult>  DeleteCompany(int id)
        {
            
            try {
                await _companyService.DeleteAsync(id);
                return Ok(ApiResponse.OkNoData("Company deleted successfully"));
            }
            catch (Exception ex)
            {
                return NotFound(ApiResponse.Fail( ex.Message));
            }

        }


    }
}
