using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RT_CardGame.Models
{
    public class Board
    {
        public Board()
        {
            this.CardsInMiddle = new List<Card>();
            this.Players = new List<Player>();
            this.Deck = new Deck();
        }

        public List<Card> CardsInMiddle { get; set; }
        public List<Player> Players { get; set; }
        public Deck Deck { get; set; }
    }
}
