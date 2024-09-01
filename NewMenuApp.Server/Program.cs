using Microsoft.EntityFrameworkCore;
using NewMenuApp.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// Add DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Serve default files (like index.html) and static files (like CSS, JS)
app.UseDefaultFiles();
app.UseStaticFiles();


// Middleware to set the response encoding to UTF-8 for HTML responses only
app.Use(async (context, next) =>
{
    await next.Invoke();

    // Check if the response is HTML
    if (context.Response.ContentType != null && context.Response.ContentType.Contains("text/html"))
    {
        context.Response.Headers["Content-Type"] = "text/html; charset=utf-8";
    }
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// NEW
// Use CORS policy
//app.UseCors("AllowSpecificOrigin");
app.UseCors("AllowAll");

app.UseAuthorization();

// Map controller routes
app.MapControllers();

// Fallback to index.html for client-side routes
app.MapFallbackToFile("index.html");

app.Run();
