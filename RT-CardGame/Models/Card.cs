using RT_CardGame.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RT_CardGame.Models
{
    public class Card
    {
        public string Suit { get; set; }
        public string Rank { get; set; }
        public int Value { get; set; }


        public Card(string InputSuit, string InputRank, int InputValue)
        {
            this.Suit = InputSuit;
            this.Rank = InputRank;
            this.Value = InputValue;
        }

        public int CompareTo(Card otherCard)
        {

            var myValue = this.Value;
            var theirValue = otherCard.Value;

            if (theirValue > myValue)
                return -1;
            else if (theirValue < myValue)
                return 1;
            else
                return 0;
        }

    }

    
}