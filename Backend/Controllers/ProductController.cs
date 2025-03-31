// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
// using ProjetoChallenge.Data;
using ProjetoChallenge.Models;

namespace ProjetoChallenge.Controllers;
[Route("api/products")]
[ApiController]
public class ProductController : ControllerBase
{
    // private readonly ApplicationDbContext _context;

    // public ProductController(ApplicationDbContext context)
    // {
    //     _context = context;
    // }

    [HttpGet]
    // public IActionResult GetProducts() => Ok(_context.Products.ToList());
    public IActionResult Get() 
    {
      var product = new List<Product>
            {
                new Product { Id = 1, Name = "Product A", Price = 100.50m },
                new Product { Id = 2, Name = "Product B", Price = 200.00m },
                new Product { Id = 3, Name = "Product C", Price = 150.75m },
                new Product { Id = 4, Name = "Product D", Price = 300.00m }
            };

            return Ok(product);
    }

    // [Authorize]
    // [HttpPost]
    // public IActionResult CreateProduct([FromBody] Product product)
    // {
    //     // _context.Products.Add(product);
    //     // _context.SaveChanges();
    //     return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
    // }
}