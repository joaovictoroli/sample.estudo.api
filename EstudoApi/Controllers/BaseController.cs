using Microsoft.AspNetCore.Mvc;

namespace EstudoApi.Controllers
{
    public abstract class BaseController : Controller
    {
        protected int GetUserId()
        {
            return int.Parse(this.User.Claims.First(i => i.Type == "UserId").Value);
        }
    }
}
