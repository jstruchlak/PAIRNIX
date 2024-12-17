using API.Extensions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// SERVICES (stored in extensions folder)
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
var app = builder.Build();


// Configure the HTTP request pipeline - Middleware
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors("AllowSpecificOrigins");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
