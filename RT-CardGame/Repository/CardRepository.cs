using RT_CardGame.IRepository;
using RT_CardGame.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RT_CardGame.Repository
{
    public class CardRepository : ICardRepository
    {
        public List<Card> GetSortedCards(List<Card> inputCards)
        {
            Deck deck = new Deck(IsNewDeckRequested: true);
            var sortedInputDeck = deck.Sort(inputCards);
            return sortedInputDeck;
        }


    }
}
