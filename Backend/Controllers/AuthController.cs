using Microsoft.AspNetCore.Mvc;
using ProjetoChallenge.Models;
using ProjetoChallenge.Services;

namespace ProjetoChallenge.Controllers;
[Route("login")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserService _userService;

    public AuthController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] User user)
    {
        var authenticatedUser = await _userService.AuthenticateAsync(user.Username, user.Password);
        if (authenticatedUser == null) return Unauthorized();
        return Ok(new { Token = "fake-jwt-token" });
    }
}


// using Microsoft.AspNetCore.Mvc;
// using Microsoft.IdentityModel.Tokens;
// using ProjetoChallenge.Models;
// using ProjetoChallenge.Services;
// using System;
// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;
// using System.Threading.Tasks;

// namespace ProjetoChallenge.Controllers;

// [Route("login")]
// [ApiController]
// public class AuthController : ControllerBase
// {
//     private readonly UserService _userService;
//     private readonly string _secretKey; // Chave secreta para gerar o token JWT

//     public AuthController(UserService userService, IConfiguration configuration)
//     {
//         _userService = userService;
//         _secretKey = configuration.GetValue<string>("Jwt:SecretKey"); // Obtenha a chave secreta da configuração
//     }

//     [HttpPost]
//     public async Task<IActionResult> Login([FromBody] User user)
//     {
//         var authenticatedUser = await _userService.AuthenticateAsync(user.Username, user.Password);
//         if (authenticatedUser == null) return Unauthorized();

//         // Gere o token JWT
//         var token = GenerateJwtToken(authenticatedUser);

//         return Ok(new { Token = token });
//     }

//     private string GenerateJwtToken(User user)
//     {
//         var tokenHandler = new JwtSecurityTokenHandler();
//         var key = Encoding.ASCII.GetBytes(_secretKey); // Certifique-se de que sua chave secreta seja segura
//         var tokenDescriptor = new SecurityTokenDescriptor
//         {
//             Subject = new ClaimsIdentity(new[]
//             {
//                 new Claim(ClaimTypes.Name, user.Username),
//                 // Adicione outras claims necessárias (por exemplo, ID do usuário, roles)
//             }),
//             Expires = DateTime.UtcNow.AddHours(1), // Defina a expiração do token
//             SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//         };
//         var token = tokenHandler.CreateToken(tokenDescriptor);
//         return tokenHandler.WriteToken(token);
//     }
// }