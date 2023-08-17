using AutoMapper;
using EstudoApi.Dtos;
using EstudoApi.Entities;

namespace EstudoApi.MapperProfiles
{
    public class AutoMaperProfiles : Profile
    {
        public AutoMaperProfiles()
        {
            CreateMap<Post, PostDto>().ReverseMap().ForMember(x => x.Replies, opt => opt.Ignore());
            CreateMap<Post, AddPostDto>().ReverseMap();
            CreateMap<Reply, ReplyDto>().ReverseMap();
            //CreateMap<PostDto, Post>()
            //    .ForMember(d => d.CountReply, o => o.MapFrom(s => s.Sender.Photos
            //    .FirstOrDefault(x => x.IsMain).Url));
        }
    }
}
