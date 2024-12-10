using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")] // api/users
public class UsersController(DataContext context) : ControllerBase
{
    [HttpGet]
    // sync = public ActionResult<IEnumerable<AppUser>> GetUsers()
    // async = public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        // sync = var users = await context.Users.ToList();
        // async = var users = await context.Users.ToListAsync();
        var users = await context.Users.ToListAsync();
        return users;
    }

    [HttpGet("{id:int}")] // api/users/3
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        var user = await context.Users.FindAsync(id);

        if (user == null) return NotFound();

        return user;
    }
}
