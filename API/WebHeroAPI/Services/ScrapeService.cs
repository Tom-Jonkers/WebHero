using WebHeroAPI.Models;
using HtmlAgilityPack;

namespace WebHeroAPI.Services
{
    public class ScrapeService
    {
        public ScrapeService()
        {
            
        }

        public List<Song> getSongList()
        {
            var web = new HtmlWeb();
            var document = web.Load("https://www.enchor.us/?instrument=guitar&difficulty=expert&name=One");


            return [];
        }
    }
}
