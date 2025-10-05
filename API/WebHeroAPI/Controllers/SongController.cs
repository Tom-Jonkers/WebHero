using Microsoft.AspNetCore.Mvc;
using WebHeroAPI.Services;

namespace WebHeroAPI.Controllers
{
    [Route("[controller]/[action]/")]
    [ApiController]
    public class SongController : ControllerBase
    {
        ScrapeService _scrapeService;

        public SongController(ScrapeService scrapeService)
        {
            _scrapeService = scrapeService;
        }
        
        [HttpGet]
        [Route("{elstringo}")]
        public ActionResult<String> GetTest(string elstringo)
        {
            return elstringo + " mais plus cool";
        }

    }
}
