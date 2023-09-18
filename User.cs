using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace my_angular_app_fulVersion
{
    public class User : IdentityUser<int>
    {
      // You can add your custom properties here, if necessary.
        // For example, if you want to store additional user-related information.

        // Note: Properties like UserName and Email are already defined in IdentityUser<int>,
        // so you don't need to redefine them here.
    }
}
