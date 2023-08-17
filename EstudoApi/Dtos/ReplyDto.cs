using EstudoApi.Entities;

namespace EstudoApi.Dtos
{
    public class ReplyDto
    {
        public string Content { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
    }
}
