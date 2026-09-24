using Application.Common;
using Application.DTOs.Auth;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRPayroll.API.Controllers
{
    [ApiController]
    [Route ("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ICurrentUserService _currentUserService;
        public AuthController(IAuthService authService, ICurrentUserService currentUserService)
        { 
         _authService = authService;
            _currentUserService = currentUserService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto dto)
        {
            await _authService.RegisterAsync(dto);
            return Ok(ApiResponse.OkNoData("Registered successfully"));   
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
        {
          var result=  await _authService.LoginAsync(dto);
            return Ok(ApiResponse<LoginResponseDto>.Ok(result));
        }
        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody]string token) 
        {
          var result =await  _authService.RefreshTokenAsync(token);
        return Ok(ApiResponse<LoginResponseDto>.Ok(result));
        }
        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] string token)
        { 
              await _authService.LogoutAsync(token);
            return Ok(ApiResponse.OkNoData("Logged out successfully"));
        
        }
       


    }
}
