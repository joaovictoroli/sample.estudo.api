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
        private readonly IReplyRepository _replyRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public PostRepository(ApplicationDbContext dbContext, IReplyRepository replyRepository, IMapper mapper)
        {
            _dbContext = dbContext;
            _replyRepository = replyRepository;
            _mapper = mapper;
        }
        public async Task<Post> AddPostAsync(Post post)
        {
            await _dbContext.Posts.AddAsync(post);
            await _dbContext.SaveChangesAsync();
            return post;
        }

        public async Task<List<PostDto>> GetAllPostsAsync()
        {
            var query = _dbContext.Posts
                .OrderByDescending(x => x.ReleaseDate)
                //.Take(4)
                .AsQueryable();

            var listPost = await query.ToListAsync();
            var listPostDto = _mapper.Map<List<Post>, List<PostDto>>(listPost);

            //foreach (var post in listPost)
            //{
            //    var user = _dbContext.Users.FirstOrDefaultAsync(x=> x.Id == post.UserId);                
            //}


            //foreach (var postDto in listPostDto)
            //{                
            //    var replies = await _dbContext.Replies.Where(x => x.PostId == postDto.Id).ToListAsync();
            //    postDto.CountReplies = replies.Count();                
            //}

            for (int i = 0; i < listPostDto.Count(); i++)
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == listPost[i].UserId);
                var replies = await _dbContext.Replies.Where(x => x.PostId == listPostDto[i].Id).ToListAsync();
                listPostDto[i].CountReplies = replies.Count();
                listPostDto[i].UserName = user.UserName;
            }

            return listPostDto;
        }

        public async Task<Post> GetPostByIdAsync(int id)
        {
            return await _dbContext.Posts.FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}
