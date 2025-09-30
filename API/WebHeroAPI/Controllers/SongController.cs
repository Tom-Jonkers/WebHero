using Microsoft.AspNetCore.Mvc;

namespace WebHeroAPI.Controllers
{

    public class SongController
    {
        [HttpGet(Name = "GetTest")]
        public String GetTest()
        {
            return "";
        }
    }
}
