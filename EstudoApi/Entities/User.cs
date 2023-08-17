using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace EstudoApi.Entities
{
    public class User : IdentityUser<int>
    {
        public string From { get; set; }
    }
}
