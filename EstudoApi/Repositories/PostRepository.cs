using AutoMapper;
using EstudoApi.Data;
using EstudoApi.Dtos;
using EstudoApi.Entities;
using EstudoApi.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace EstudoApi.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public PostRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Post> AddPostAsync(Post post)
        {
            await _dbContext.Posts.AddAsync(post);
            await _dbContext.SaveChangesAsync();
            return post;
        }

        public async Task<Post> DeletePostByIdAsync(int id)
        {
            var post = await _dbContext.Posts.SingleOrDefaultAsync(post => post.Id == id);

            if (post == null) { return null; }

            _dbContext.Remove(post);
            await _dbContext.SaveChangesAsync();

            return post;
        }

        public async Task<List<Post>> GetAllPostsAsync()
        {
            var query = _dbContext.Posts
                .OrderByDescending(x => x.ReleaseDate)
                .Include(r => r.Replies)
                .ToList();

            var list = query.ToList();

            return list;
        }

        public async Task<Post> GetPostByIdAsync(int id)
        {
            var post = await _dbContext.Posts.Include(x => x.Replies)
                                            .FirstOrDefaultAsync(x => x.Id == id);

            return post;
        }
    }
}
