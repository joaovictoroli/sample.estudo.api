using EstudoApi.Data;
using EstudoApi.Dtos;
using EstudoApi.Entities;
using EstudoApi.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata.Ecma335;

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

        public async Task<Reply> DeleteReplyByIdAsync(int id)
        {
            var reply = await _dbContext.Replies.SingleOrDefaultAsync(post => post.Id == id);

            if (reply == null) { return null; }

            _dbContext.Remove(reply);
            await _dbContext.SaveChangesAsync();

            return reply;
        }

        public async Task<Reply> GetReplyById(int Id)
        {
            return await _dbContext.Replies.FirstOrDefaultAsync(x => x.Id == Id);
        }
    }
}
