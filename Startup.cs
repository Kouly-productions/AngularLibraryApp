using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Text;

namespace my_angular_app_fulVersion
{
    public class Startup{
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method is used to configure services. It gets called by the runtime.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<MyDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

      _ = services.AddIdentity<User, IdentityRole<int>>(options =>
      {
        options.Password.RequiredLength = 8;
        options.Password.RequireDigit = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireNonAlphanumeric = false;
      })
      .AddEntityFrameworkStores<MyDbContext>()
      .AddDefaultTokenProviders();
                services.AddControllers();
            

           // Configure CORS to allow requests from http://localhost:4200
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("https://localhost:4200", "https://localhost:7084")
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                           
                });
            });
            

            // Configure JWT authentication
            /*var key = Encoding.ASCII.GetBytes("Steamthegoat123"); // Replace with a strong secret key
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });*/

            // Configure Swagger (OpenAPI)
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });
        }

        // This method is used to configure the HTTP request pipeline. It gets called by the runtime.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Configure the pipeline based on the environment (Development, Production, etc.)
            if (env.IsDevelopment())
            {
                app.UseCors(); // Enable CORS for development environment
                app.UseRouting();
                
                app.UseDeveloperExceptionPage();

                // Optionally, configure Swagger for API documentation
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"));
            }

            // Redirect HTTP to HTTPS
            app.UseHttpsRedirection();

            // Add middleware for routing, authentication, etc.
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();


            // Add endpoint routing for API controllers
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

