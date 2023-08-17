using EstudoApi.Data;
using EstudoApi.Entities;
using EstudoApi.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EstudoApi.Repositories
{
    public class ReplyRepository : IReplyRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public ReplyRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Reply> AddReplyAsync(Reply reply)
        {
            await _dbContext.Replies.AddAsync(reply);
            await _dbContext.SaveChangesAsync();
            return reply;
        }

        public async Task<List<Reply>> GetRepliesByPost(int postId)
        {
            return await _dbContext.Replies.Where(r => r.PostId == postId).ToListAsync();
        }
    }
}
