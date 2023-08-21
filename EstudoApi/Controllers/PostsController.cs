using AutoMapper;
using EstudoApi.Dtos;
using EstudoApi.Entities;
using EstudoApi.Extensions;
using EstudoApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;


namespace EstudoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IReplyRepository _replyRepository;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public PostsController(IPostRepository postRepository, IMapper mapper, IReplyRepository replyRepository, UserManager<User> userManager)
        {
            _postRepository = postRepository;
            _mapper = mapper;
            _replyRepository = replyRepository;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetAllPosts()
        {
            var posts = await _postRepository.GetAllPostsAsync();
            //foreach (var post in posts)
            //{
            //    Console.WriteLine($"Post {post.Id} posts");
            //}
            return Ok(posts);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Post>> AddPost(AddPostDto addPostDto)
        {
            var userId = User.GetUserId();

            var post = _mapper.Map<AddPostDto, Post>(addPostDto);

            post.UserId = userId;

            post = await _postRepository.AddPostAsync(post);

            return Ok(post);
        }

        [Authorize]
        [HttpPost("{postId}")]
        public async Task<ActionResult<Reply>> AddReplyToPost(int postId, ReplyDto replyDto)
        {
            replyDto.Username = User.GetUsername();
            var reply = _mapper.Map<ReplyDto, Reply>(replyDto);

            reply.PostId = postId;
            reply.UserId = User.GetUserId();
            reply = await _replyRepository.AddReplyAsync(reply);

            return Ok(reply);
        }

        [Authorize]
        [HttpGet("{postId}")]
        public async Task<ActionResult<PostDetailsDto>> GetPostDetails(int postId)
        {
            Console.WriteLine($"Post Details: {postId}");
            var post = await _postRepository.GetPostByIdAsync(postId);

            var repliesDto = await _replyRepository.GetRepliesByPost(postId);

            //var repliesDto = _mapper.Map < List<Reply>, List<ReplyDto>>(replies);

            var user = await _userManager.FindByIdAsync(post.UserId.ToString());
            var postDetails = new PostDetailsDto()
            {
                PostId = post.Id,
                Title = post.Title,
                Content = post.Content,
                ReleaseDate = post.ReleaseDate,
                Replies = repliesDto,
                Username = user.UserName,
                UserId = post.UserId
            };

            return postDetails;
        }


    }
}
