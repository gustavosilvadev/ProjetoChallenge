using Microsoft.AspNetCore.Mvc;
using ProjetoChallenge.Models;
using ProjetoChallenge.Services;

namespace ProjetoChallenge.Controllers;


[Route("api/products")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly ProductService _productService;

    public ProductController(ProductService productService)
    {
        _productService = productService;
    }



/*
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAllProducts()
    {
      var product = new List<Product>
            {
                new Product { Id = 1, Name = "Product A", Price = 100.50m },
                new Product { Id = 2, Name = "Product B", Price = 200.00m },
                new Product { Id = 3, Name = "Product C", Price = 150.75m },
                new Product { Id = 4, Name = "Product D", Price = 300.00m }
            };

            return Ok(product);
        
            // Console.WriteLine(">>>>>>>>>>>>>>>>>>>> GUSTAVO 00101010");

        // return await _productService.GetAllProducts();

    }
    */

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAllProducts() 
    {
        return await _productService.GetAllProducts();
    }
    /*
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
    */

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        return await _productService.CreateProduct(product);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> UpdateProduct(Guid id, Product product)
    {
        var updatedProduct = await _productService.UpdateProduct(id, product);
        if (updatedProduct == null) return NotFound();
        return updatedProduct;
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteProduct(Guid id)
    {
        var deleted = await _productService.DeleteProduct(id);
        if (!deleted) return NotFound();
        return Ok(true);
    }
}