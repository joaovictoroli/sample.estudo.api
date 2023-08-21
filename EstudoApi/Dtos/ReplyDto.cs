using EstudoApi.Entities;
using System.ComponentModel.DataAnnotations;

namespace EstudoApi.Dtos
{
    public class ReplyDto
    {
        [Required]
        public string Content { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
    }
}
