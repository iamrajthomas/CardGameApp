using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using RT_CardGame.IRepository;
using RT_CardGame.Models;
using RT_CardGame.Repository;

namespace RT_CardGame
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddTransient<ICardRepository, CardRepository>();

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "RT_CardGame_API",
                    Description = "RT_CardGame_API",
                    TermsOfService = new Uri("https://rajthomastest.com/terms"),
                    Contact = new OpenApiContact
                    {
                        Name = "RT Test Contact",
                        Url = new Uri("https://rajthomastest.com/contact")
                    },
                    License = new OpenApiLicense
                    {
                        Name = "RT Test License",
                        Url = new Uri("https://rajthomastest.com/license")
                    }
                });
            });

            services.AddDbContext<GameDbContext>(options => 
                                options.UseSqlServer(Configuration.GetConnectionString("DBConnection")));
            services.AddCors();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors(options =>
                options
                .AllowAnyOrigin()
                // .WithOrigins("http://localhost:4200", "http://localhost:1620")
                .AllowAnyMethod()
                .AllowAnyHeader()
            );

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "RT_API_V1");
            });
        }
    }

}
