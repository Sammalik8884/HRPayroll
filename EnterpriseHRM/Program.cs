using Application.Middleware;
using Application.Middleware;
using Microsoft.OpenApi;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// ─── Serilog structured logging ─────────────────────────────────────────────
// Structured: every log entry has named properties, not just a string.
// {EmployeeId}, {Duration} become queryable fields in Azure App Insights.
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .Enrich.WithMachineName()
    .WriteTo.Console(outputTemplate:
        "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}")
    .CreateLogger();

builder.Host.UseSerilog();

// ─── Controllers & API ──────────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// ─── Swagger with JWT support ───────────────────────────────────────────────
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "HRPayroll API",
        Version = "v1",
        Description = "HR & Payroll Management System"
    });

    // This adds the "Authorize" button to Swagger so you can test JWT endpoints
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header. Enter: Bearer {your-token}",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

   
});

// ─── CORS ────────────────────────────────────────────────────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                builder.Configuration.GetSection("AllowedOrigins").Get<string[]>()
                ?? new[] { "http://localhost:3000" })
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// ─── JWT Authentication ──────────────────────────────────────────────────────
// (Full JWT setup comes in Part 5 — skeleton only for now)
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

var app = builder.Build();

// ─── Middleware Pipeline Order (ORDER MATTERS) ───────────────────────────────
// ExceptionMiddleware MUST be first — wraps everything, catches all exceptions
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();    // "who are you?" must come before authorization
app.UseAuthorization();     // "are you allowed?" must come after authentication
app.MapControllers();

app.Run();