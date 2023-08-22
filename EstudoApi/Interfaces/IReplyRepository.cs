using EstudoApi.Dtos;
using EstudoApi.Entities;

namespace EstudoApi.Interfaces
{
    public interface IReplyRepository
    {
        Task<Reply> AddReplyAsync(Reply reply);
        Task<Reply> DeleteReplyByIdAsync(int id);
        Task<Reply> GetReplyById(int id);
    }
}
