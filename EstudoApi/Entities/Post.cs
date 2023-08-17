using EstudoApi.Entities.Common;

namespace EstudoApi.Entities
{
    public class Post : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        //public int CountReplies { get; set; }
        public DateTime ReleaseDate { get; set; } = DateTime.Now;
        public int UserId { get; set; } 
        public ICollection<Reply> Replies { get; set; }

        //public void setCountReply()
        //{
        //    this.CountReply = Replies.Count();
        //}
    }
}
