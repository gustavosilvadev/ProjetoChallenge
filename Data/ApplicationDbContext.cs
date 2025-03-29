using Microsoft.EntityFrameworkCore;
using ProjetoChallenge.Models;

namespace ProjetoChallenge.Data;
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
}