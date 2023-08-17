using EstudoApi.Entities;

namespace EstudoApi.Interfaces
{
    public interface IReplyRepository
    {
        Task<Reply> AddReplyAsync(Reply reply);
        Task<List<Reply>> GetRepliesByPost(int postId);
    }
}
