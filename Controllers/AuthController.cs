using Microsoft.AspNetCore.Mvc;
using ProjetoChallenge.Models;
using ProjetoChallenge.Services;

namespace ProjetoChallenge.Controllers;
[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserService _userService;

    public AuthController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User user)
    {
        var authenticatedUser = await _userService.AuthenticateAsync(user.Username, user.Password);
        if (authenticatedUser == null) return Unauthorized();
        return Ok(new { Token = "fake-jwt-token" });
    }
}