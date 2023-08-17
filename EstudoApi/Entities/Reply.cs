using EstudoApi.Entities.Common;

namespace EstudoApi.Entities
{
    public class Reply : BaseEntity
    {
        public string Content { get; set; }
        public Post Post { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
    }
}
