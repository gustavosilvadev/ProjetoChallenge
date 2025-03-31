using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace ProjetoChallenge.Models;
public class Product
{
    public int Id { get; set; }


    [Required]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    public string Description { get; set; }

    [Required]
    public decimal Price { get; set; }

    [Required]
    public int Quantity {get; set; } 
}