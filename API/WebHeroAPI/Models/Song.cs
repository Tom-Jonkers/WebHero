namespace WebHeroAPI.Models
{
    public class Song
    {
        public string? Name { get; set; }
        public string? Artist { get; set; }
        public string? Year { get; set; }
        public string? Album { get; set; }
        public int? Length { get; set; }
        public int? NoteCount { get; set; }
        public int? NPS { get; set; }
        public int? Difficulty { get; set; }
        public string? ImageURL { get; set; }
        public string? Hash { get; set; }
    }
}
