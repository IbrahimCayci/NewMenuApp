using NewMenuApp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using NewMenuApp.Server.Data;


namespace MenuApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ItemController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/item
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            return await _context.Items.ToListAsync();
        }

        // GET: api/item/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }


        // GET: api/item/type/1
        [HttpGet("type/{dataType}")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItemsByType(int dataType)
        {
            var items = await _context.Items.Where(i => i.ItemType == dataType).ToListAsync();
            /*
            if (items == null || items.Count == 0)
            {
                return NotFound();
            }
            */
            return items;
        }


        // POST: api/item
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
        }

        // PUT: api/item/1
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, Item item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/item/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return _context.Items.Any(e => e.Id == id);
        }

        /*
        private static readonly IEnumerable<Item> Items = new[]
        {
            new Item{Id =1, Title = "The Godfather", ImageId=1, Ranking=0,ItemType=1 },
            new Item{Id =2, Title = "Highlander", ImageId=2, Ranking=0,ItemType=1 },
            new Item{Id =3, Title = "Highlander II", ImageId=3, Ranking=0,ItemType=1 },
            new Item{Id =4, Title = "The Last of the Mohicans", ImageId=4, Ranking=0,ItemType=1 },
            new Item{Id =5, Title = "Police Academy 6", ImageId=5, Ranking=0,ItemType=1 },
            new Item{Id =6, Title = "Rear Window", ImageId=6, Ranking=0,ItemType=1 },
            new Item{Id =7, Title = "Road House", ImageId=7, Ranking=0,ItemType=1 },
            new Item{Id =8, Title = "The Shawshank Redemption", ImageId=8, Ranking=0,ItemType=1 },
            new Item{Id =9, Title = "Star Treck IV", ImageId=9, Ranking=0,ItemType=1 },
            new Item{Id =10, Title = "Superman 4", ImageId=10, Ranking=0,ItemType=1 },
            new Item{Id = 11, Title = "Abbey Road", ImageId=11, Ranking=0,ItemType=2 },
            new Item{Id = 12, Title = "Adrenalize", ImageId=12, Ranking=0,ItemType=2 },
            new Item{Id = 13, Title = "Back in Black", ImageId=13, Ranking=0,ItemType=2 },
            new Item{Id = 14, Title = "Enjoy the Silence", ImageId=14, Ranking=0,ItemType=2 },
            new Item{Id = 15, Title = "Parachutes", ImageId=15, Ranking=0,ItemType=2 },
            new Item{Id = 16, Title = "Ride the Lightning", ImageId=16, Ranking=0,ItemType=2 },
            new Item{Id = 17, Title = "Rock or Bust", ImageId=17, Ranking=0,ItemType=2 },
            new Item{Id = 18, Title = "Rust in Peace", ImageId=18, Ranking=0,ItemType=2 },
            new Item{Id = 19, Title = "St. Anger", ImageId=19, Ranking=0,ItemType=2 },
            new Item{Id = 20, Title = "The Final Countdown", ImageId=20, Ranking=0,ItemType=2 }    

        };
    

        [HttpGet("{itemType:int}")]
        public Item[] Get(int itemType)
        {
            Item[] items = Items.Where(i => i.ItemType == itemType).ToArray();
            return items;
        }

        */
    }
        
}
