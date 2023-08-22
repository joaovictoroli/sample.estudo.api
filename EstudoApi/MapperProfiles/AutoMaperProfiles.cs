using AutoMapper;
using EstudoApi.Dtos;
using EstudoApi.Entities;

namespace EstudoApi.MapperProfiles
{
    public class AutoMaperProfiles : Profile
    {
        public AutoMaperProfiles()
        {
            CreateMap<Post, PostDto>().
                ForMember(x => x.CountReplies, opt => opt.MapFrom(o => o.Replies.Count()));
            CreateMap<PostDto, Post>();
            CreateMap<Post, PostDetailsDto>().ReverseMap();

            CreateMap<Post, AddPostDto>().ReverseMap();
            CreateMap<Reply, ReplyDto>().ReverseMap();
        }
    }
}
