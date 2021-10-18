using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace AuthService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly JwtGenerator _jwtGenerator;
        public IConfiguration _configuration { get; }
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
            _jwtGenerator = new JwtGenerator(_configuration.GetValue<string>("JwtPrivateSigningKey"));

        }

        public class AuthenticateRequest
        {
            [Required]
            public string IdToken { get; set; }
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateRequest data)
        {
            GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();

            IConfigurationSection googleAuthNSection =
                    _configuration.GetSection("Authentication:Google");

            string googleClientId = googleAuthNSection["ClientId"];

            // Change this to your google client ID
            settings.Audience = new List<string>() { googleClientId };
            
            GoogleJsonWebSignature.Payload payload  = GoogleJsonWebSignature.ValidateAsync(data.IdToken, settings).Result;
            return Ok(new { AuthToken = _jwtGenerator.CreateUserAuthToken(payload.Email) });
        }
    }
}