using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class AuthRequest
    {
        //[Required]
        public string Username { get; set; }
        //[Required]
        public string Password { get; set; }
        public string IdToken { get; set; }
    }
}