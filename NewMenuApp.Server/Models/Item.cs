namespace NewMenuApp.Server.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string ?Title { get; set; }
        public string ?Description { get; set; }
        public int ?Price { get; set; }
        public string ?Image { get; set; }
        public int ItemType { get; set; }
    }
}
