using RT_CardGame.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RT_CardGame.IRepository
{
    public interface ICardRepository
    {
        List<Card> GetSortedCards(List<Card> inputCards);
    }
}
