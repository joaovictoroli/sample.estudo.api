using EstudoApi.Dtos;
using EstudoApi.Entities;

namespace EstudoApi.Interfaces
{
    public interface IPostRepository
    {
        Task<Post> AddPostAsync(Post post);
        Task<List<PostDto>> GetAllPostsAsync();
        Task<Post> GetPostByIdAsync(int id);

    }
}
