using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Voter.Api.Models;
using Voter.Api.Services;

namespace Voter.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        #region Cross Origin Resource Sharing (CORS)

        private string CorsPolicy { get; } = "allow-specific-origin";
        private string[] ApplicationHeaders { get; } = { "Content-Type" };
        private string[] ApplicationMethods { get; } = { "GET", "POST", "PUT", "OPTIONS" };

        #endregion


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Cross Origin Resource Sharing (CORS)
            var allowedOrigins = Environment.GetEnvironmentVariable("ALLOWED_ORIGIN").Split(';');
            services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicy, builder =>
                {
                    builder
                        .WithOrigins(allowedOrigins)
                        .WithHeaders(ApplicationHeaders)
                        .WithMethods(ApplicationMethods);
                });
            });

            // requires using Microsoft.Extensions.Options
            services.Configure<VoteDatabaseSettings>(
                Configuration.GetSection(nameof(VoteDatabaseSettings)));

            services.AddSingleton<IVoteDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<VoteDatabaseSettings>>().Value);

            services.AddSingleton<QuestionService>();

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            // Enable Cross Origin Resource Sharing (CORS)
            app.UseCors(CorsPolicy);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
