using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using my_angular_app_fulVersion;

namespace my_angular_app_fulVersion.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(UserRegistration model)
        {
            var user = new User
            {
                UserName = model.Username,
                Email = model.email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // You can customize your success response here
                return Ok(new { message = "User signed up successfully." });
            }
            else
            {
                // Return validation errors
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserLogin model)
        {
            var user = await _userManager.FindByEmailAsync(model.email);

            if (user == null)
            {
                // The provided input is not an email, try finding user by username
                user = await _userManager.FindByNameAsync(model.email);

                if (user == null)
                {
                    return BadRequest(new { message = "Invalid login attempt." });
                }
            }

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                // You can customize your success response here
                return Ok(new { message = "User logged in successfully." });
            }
            else
            {
                // Return error message
                return BadRequest(new { message = "Invalid login attempt." });
            }
        }
    }
}