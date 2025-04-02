using Microsoft.AspNetCore.Mvc;
using ProjetoChallenge.Models;
using ProjetoChallenge.Services;

namespace ProjetoChallenge.Controllers;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<ActionResult<List<User>>> GetAllUsers()
    {
        return await _userService.GetAllUsers();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserById(Guid id)
    {
        var user = await _userService.GetUserById(id);
        if (user == null) return NotFound();
        return user;
    }

    [HttpPost]
    public async Task<ActionResult<User>> CreateUser(User user)
    {
        return await _userService.CreateUser(user);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<User>> UpdateUser(Guid id, User user)
    {
        var updatedUser = await _userService.UpdateUser(id, user);
        if (updatedUser == null) return NotFound();
        return updatedUser;
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteUser(Guid id)
    {
        var deleted = await _userService.DeleteUser(id);
        if (!deleted) return NotFound();
        return Ok(true);
    }
}