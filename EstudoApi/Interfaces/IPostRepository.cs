using EstudoApi.Dtos;
using EstudoApi.Entities;

namespace EstudoApi.Interfaces
{
    public interface IPostRepository
    {
        Task<Post> AddPostAsync(Post post);
        Task<List<Post>> GetAllPostsAsync();
        Task<Post> GetPostByIdAsync(int id);
        Task<Post> DeletePostByIdAsync(int id);
    }
}
