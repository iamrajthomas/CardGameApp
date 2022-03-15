using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RT_CardGame.IRepository;
using RT_CardGame.Models;

namespace RT_CardGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private ICardRepository _cardRepository;

        public CardController(ICardRepository cardRepository)
        {
            this._cardRepository = cardRepository;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> GetPrioritySortedCard()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values
        [HttpGet("GetCardsList")]
        public ActionResult<IEnumerable<string>> GetCardsList()
        {
            return new string[] { "Card1", "Card2", "Card3", "Card4", "Card5", "Card6", "Card7" };
        }

        // POST api/values
        [HttpPost("PostPrioritySortedCard")]
        public ActionResult<IEnumerable<Card>> PostPrioritySortedCard([FromBody] List<Card> cards)
        {
            List<Card> sortedCards = this._cardRepository.GetSortedCards(cards);

            return sortedCards;
        }


    }
}