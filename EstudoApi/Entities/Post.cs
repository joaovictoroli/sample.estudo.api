using EstudoApi.Entities.Common;

namespace EstudoApi.Entities
{
    public class Post : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime ReleaseDate { get; set; } = DateTime.Now;
        public string Username { get; set; }
        public int UserId { get; set; }
        public ICollection<Reply> Replies { get; set; }

    }
}
