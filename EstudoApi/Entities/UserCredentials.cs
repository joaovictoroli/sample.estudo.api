using EstudoApi.Entities.Common;
using System.ComponentModel.DataAnnotations;

namespace EstudoApi.Entities
{
    public class UserDetails : BaseEntity
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string From { get; set; }
        [Required]
        public string Password { get; set; }

    }
}
