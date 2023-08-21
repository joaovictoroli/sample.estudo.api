using EstudoApi.Dtos;
using EstudoApi.Entities;

namespace EstudoApi.Interfaces
{
    public interface IReplyRepository
    {
        Task<Reply> AddReplyAsync(Reply reply);
        Task<List<ReplyDto>> GetRepliesByPost(int postId);
    }
}
