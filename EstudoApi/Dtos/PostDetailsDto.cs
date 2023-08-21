using EstudoApi.Entities;

namespace EstudoApi.Dtos
{
    public class PostDetailsDto
    {
        public int PostId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Username { get; set; }
        public int UserId { get; set; }
        public DateTime ReleaseDate { get; set; }
        public List<ReplyDto> Replies { get; set; }
    }
}
