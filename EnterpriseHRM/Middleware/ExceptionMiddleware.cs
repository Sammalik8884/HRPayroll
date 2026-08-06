
using Application.Common;
using Application.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Text.Json;

namespace Application.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);  
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }
        private async Task HandleExceptionAsync(HttpContext context, Exception exception) 
        {
            context.Response.ContentType = "application/json";
            var (statusCode, response) = exception switch
            {
                NotFoundException ex =>
                   (HttpStatusCode.NotFound,
                    ApiResponse.Fail(ex.Message)),

                ValidationException ex =>
                    (HttpStatusCode.UnprocessableEntity,
                     ApiResponse.ValidationFail(ex.Errors)),

                UnauthorizedException ex =>
                    (HttpStatusCode.Forbidden,
                     ApiResponse.Fail(ex.Message)),

                DomainException ex =>
                    (HttpStatusCode.UnprocessableEntity,
                     ApiResponse.Fail(ex.Message)),

             
                _ =>
                    (HttpStatusCode.InternalServerError,
                     ApiResponse.Fail("An unexpected error occurred. Please contact support."))
            };
            if (exception is not DomainException)
            {
                _logger.LogError(exception,
                    "Unhandled exception: {Message} | Path: {Path}",
                    exception.Message,
                    context.Request.Path);
            }

            context.Response.StatusCode = (int)statusCode;
            var json = JsonSerializer.Serialize(response,
                new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
            await context.Response.WriteAsync(json);
        }



    }
    
}
