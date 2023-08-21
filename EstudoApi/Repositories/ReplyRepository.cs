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
        private readonly UserManager<User> _userManager;

        public ReplyRepository(ApplicationDbContext dbContext, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }
        public async Task<Reply> AddReplyAsync(Reply reply)
        {
            await _dbContext.Replies.AddAsync(reply);
            await _dbContext.SaveChangesAsync();
            return reply;
        }

        public async Task<List<ReplyDto>> GetRepliesByPost(int postId)
        {
            var repliesDto = new List<ReplyDto>();
            var replies = await _dbContext.Replies.Where(r => r.PostId == postId).ToListAsync();

            foreach (var reply in replies)
            {
                var user = await _userManager.FindByIdAsync(reply.UserId.ToString());

                var replyDto = new ReplyDto()
                {
                    PostId = reply.PostId,
                    UserId = reply.UserId,
                    Username = user.UserName,
                    Content = reply.Content
                };
                repliesDto.Add(replyDto);
            }
            return repliesDto;
        }
    }
}
