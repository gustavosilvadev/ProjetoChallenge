
using Microsoft.EntityFrameworkCore;
using ProjetoChallenge.Data;
using ProjetoChallenge.Models;

namespace ProjetoChallenge.Services;

public class ProductService
{
    private readonly ApplicationDbContext _context;

    public ProductService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> GetAllProducts()
    {
        return await _context.Products.ToListAsync();
    }

    public async Task<Product?> GetProductById(Guid id)
    {
        return await _context.Products.FindAsync(id);
    }

    public async Task<Product?> CreateProduct(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<Product> UpdateProduct(Guid id, Product product)
    {
        var existingProduct = await _context.Products.FindAsync(id);
        if (existingProduct == null) return null;

        existingProduct.Name = product.Name;
        existingProduct.Description = product.Description;
        existingProduct.Price = product.Price;
        existingProduct.Quantity = product.Quantity;

        await _context.SaveChangesAsync();
        return existingProduct;
    }

    public async Task<bool> DeleteProduct(Guid id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return false;

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }
}