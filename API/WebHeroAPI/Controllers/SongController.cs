using Microsoft.AspNetCore.Mvc;
using WebHeroAPI.Models;
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
        public IEnumerable<Song> GetDefaultList()
        {
            IEnumerable<Song> songs = _scrapeService.getSongList();
            return songs;
        }

    }
}
