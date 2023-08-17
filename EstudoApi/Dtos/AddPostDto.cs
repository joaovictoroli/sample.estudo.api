namespace EstudoApi.Dtos
{
    public class AddPostDto
    {
        public string Title { get; set; }
        public string Content { get; set; }        
        public int CountReplies { get; set; } = 0;
        public DateTime ReleaseDate { get; set; } = DateTime.Now;
    }
}
