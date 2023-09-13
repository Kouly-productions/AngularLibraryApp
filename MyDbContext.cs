using Microsoft.EntityFrameworkCore;
using my_angular_app_fulVersion;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace my_angular_app_fulVersion
{
  public class MyDbContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }

        

    // Add other DbSet properties for other data models, if any.
}
}
