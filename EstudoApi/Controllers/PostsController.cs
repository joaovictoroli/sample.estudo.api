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
        private readonly IMapper _mapper;

        public PostsController(IPostRepository postRepository, IMapper mapper, IReplyRepository replyRepository)
        {
            _postRepository = postRepository;
            _mapper = mapper;
            _replyRepository = replyRepository;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetAllPosts()
        {
            var posts = await _postRepository.GetAllPostsAsync();
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
            var post = await _postRepository.GetPostByIdAsync(postId);

            var replies = await _replyRepository.GetRepliesByPost(postId);

            var repliesDto = _mapper.Map < List<Reply>, List<ReplyDto>>(replies);

            var postDetails = new PostDetailsDto()
            {
                PostId = post.Id,
                Title = post.Title,
                Content = post.Content,
                ReleaseDate = post.ReleaseDate,
                Replies = repliesDto,
                UserId = post.UserId
            };

            return postDetails;
        }


    }
}
