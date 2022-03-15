using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RT_CardGame.Models
{
    public class Deck
    {
        public List<Card> Cards { get; set; }

        public Deck()
        {
            this.Cards = new List<Card>();
        }

        public Deck(bool IsNewDeckRequested)
        {
            if (IsNewDeckRequested)
                this.Cards = this.CreateSortedDecK();
        }

        private List<Card> CreateSortedDecK()
        {
            List<Card> Cards = new List<Card>();

            // Here we are creating all the special cards
            List<string> SpecialSuits = new List<string> { "SC" };
            List<string> SpecialRanks = new List<string> { "4T", "2T", "ST", "PT", "RT" };
            List<int> SpecialValues = new List<int> { 1, 2, 3, 4, 5 };
            int ScoreForEachSuit = 100; 
            for (int i = 0; i < SpecialSuits.Count; i++)
            {
                for (int j = 0; j < SpecialRanks.Count; j++)
                {
                    var calcValue = ScoreForEachSuit + SpecialValues[j];
                    Cards.Add(new Card(SpecialSuits[i], SpecialRanks[j], calcValue));
                }
                ScoreForEachSuit += 100;
            }

            // Here we are creating all the standard cards 
            //List<string> Suits = new List<string> { "♦", "♣", "♠", "♥" };
            List<string> Suits = new List<string> { "D", "S", "C", "H" };
            List<string> Ranks = new List<string> { "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A" };
            List<int> Values = new List<int> { 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 };
            ScoreForEachSuit = 2200;

            for (int i = 0; i < Suits.Count; i++)
            {
                for (int j = 0; j < Ranks.Count; j++)
                {
                    var calcValue = ScoreForEachSuit + Values[j];
                    //Cards.Add(new Card(Suits[i], Ranks[j], Values[j]));
                    Cards.Add(new Card(Suits[i], Ranks[j], calcValue));
                }

                ScoreForEachSuit += 100;
            }

            return Cards;
        }

        public List<Card> Sort(List<Card> cards)
        {
            cards.Sort((Card x, Card y) =>
            {
                return x.CompareTo(y);
            });
            return cards;
        }

    }
}