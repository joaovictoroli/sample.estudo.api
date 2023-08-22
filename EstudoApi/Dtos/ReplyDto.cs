using EstudoApi.Entities;
using EstudoApi.Entities.Common;
using System.ComponentModel.DataAnnotations;

namespace EstudoApi.Dtos
{
    public class ReplyDto : BaseEntity
    {
        [Required]
        public string Content { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
    }
}
