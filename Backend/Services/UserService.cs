/*

using Microsoft.EntityFrameworkCore;
using ProjetoChallenge.Data;
using ProjetoChallenge.Models;
using System.Security.Cryptography;
using System.Text;

namespace ProjetoChallenge.Services;
public class UserService
{
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<User?> AuthenticateAsync(string username, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null || !VerifyPassword(password, user.PasswordHash)) return null;
        return user;
    }

    private bool VerifyPassword(string password, string storedHash)
    {
        using var sha256 = SHA256.Create();
        var hashed = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
        return hashed == storedHash;
    }
}

*/


using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using ProjetoChallenge.Data;
using ProjetoChallenge.Models;
// using System.Collections.Generic;
// using System.Threading.Tasks;

namespace ProjetoChallenge.Services;

public class UserService
{
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<User>> GetAllUsers()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User?> GetUserById(Guid id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User?> CreateUser(User user)
    {
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User> UpdateUser(Guid id, User user)
    {
        var existingUser = await _context.Users.FindAsync(id);
        if (existingUser == null) return null;

        existingUser.Name = user.Name;
        existingUser.Email = user.Email;
        existingUser.Username = user.Username;
        existingUser.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

        await _context.SaveChangesAsync();
        return existingUser;
    }

    public async Task<bool> DeleteUser(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return false;

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }


    public async Task<User?> AuthenticateAsync(string username, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

        if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
        {
            return user;
        }

        return null;
    }
}