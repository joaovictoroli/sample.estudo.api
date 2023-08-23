using AutoMapper;
using EstudoApi.Dtos;
using EstudoApi.Entities;
using EstudoApi.Extensions;
using EstudoApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
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

            var postsDto = _mapper.Map<List<Post>, List<PostDto>>(posts);
            return Ok(postsDto);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<PostDto>> AddPost(AddPostDto addPostDto)
        {
            var userId = User.GetUserId();
            var userName = User.GetUsername();

            var post = _mapper.Map<AddPostDto, Post>(addPostDto);

            post.UserId = userId;
            post.Username = userName;

            post = await _postRepository.AddPostAsync(post);

            return Ok(addPostDto);
        }

        [Authorize]
        [HttpPost("{postId}")]
        public async Task<ActionResult<ReplyDto>> AddReplyToPost(int postId, ReplyDto replyDto)
        {
            var reply = _mapper.Map<ReplyDto, Reply>(replyDto);

            var post = await _postRepository.GetPostByIdAsync(postId);

            if (post == null)
            {
                return NotFound("Post not found");
            }

            reply.PostId = postId;
            reply.UserId = User.GetUserId();
            reply.Username = User.GetUsername();
            
            await _replyRepository.AddReplyAsync(reply);

            replyDto = _mapper.Map<Reply, ReplyDto>(reply);

            return Ok(replyDto);
        }

        [Authorize]
        [HttpGet("{postId}")]
        public async Task<ActionResult<PostDetailsDto>> GetPostDetails(int postId)
        {           
            var post = await _postRepository.GetPostByIdAsync(postId);
            var postDto = _mapper.Map<Post, PostDetailsDto>(post);

            return postDto;
        }

        [Authorize]
        [HttpDelete("{postId}")]

        public async Task<IActionResult> DeletePost(int postId)
        {
            var userId = User.GetUserId();

            var post = await _postRepository.GetPostByIdAsync(postId);

            if (post == null)
            {
                return NotFound();
            }

            if (post.UserId == userId) 
            {
                await _postRepository.DeletePostByIdAsync(postId);
                return Ok(post);
            }   

            return BadRequest("Something went wrong");
        }

        [Authorize]
        [HttpDelete("{postId}/{id}")]

        public async Task<IActionResult> DeleteReply(int postId, int id)
        {
            Console.WriteLine("Aqui");
            var userId = User.GetUserId();
            var reply = await _replyRepository.GetReplyById(id);

            if (reply == null)
            {
                return NotFound("Reply not found");
            }

            if (reply.UserId == userId && reply.PostId == postId) 
            {
                await _replyRepository.DeleteReplyByIdAsync(id);
                return Ok(reply);
            }

            var post = await _postRepository.GetPostByIdAsync(postId);
            if (post == null)
            {
                return NotFound("Post not found");
            }

            return BadRequest("Something went wrong");
        }
    }
}
