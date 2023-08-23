using EstudoApi.Entities.Common;

namespace EstudoApi.Dtos
{
    public class PostDto : BaseEntity
    {
        //public PostDto() 
        //{
        //    this.CountReplies = this.replies.Count();
        //}

        public string Title { get; set; }
        public string Content { get; set; }
        public int CountReplies { get; set; }
        public DateTime ReleaseDate { get; set; } = DateTime.Now;
        public string UserName { get; set; }
        public List<ReplyDto> replies { get; set; }
    }
}
