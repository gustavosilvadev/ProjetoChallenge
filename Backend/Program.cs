using Microsoft.EntityFrameworkCore;
using ProjetoChallenge.Data;
using ProjetoChallenge.Extensions;
// using ProjetoChallenge.Services;
using static ProjetoChallenge.Extensions.ServiceCollectionExtensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// builder.Services.AddScoped<UserService>();
builder.Services.RegisterServices();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
    );
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllPermissions",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors("AllPermissions");
app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();

using(var scope = app.Services.CreateScope())
{   
    var services = scope.ServiceProvider;
    try {

    var context = services.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();
    }
    catch(Exception ex ) {
        Console.Error.WriteLine("Erro ao aplicar migrações: " + ex.Message);
    }
}

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
