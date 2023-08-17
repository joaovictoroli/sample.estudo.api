using EstudoApi.Entities.Common;

namespace EstudoApi.Dtos
{
    public class PostDto : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int CountReplies { get; set; }
        public DateTime ReleaseDate { get; set; } = DateTime.Now;
        public string UserName { get; set; }
    }
}
