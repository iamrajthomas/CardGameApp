using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RT_CardGame.Models
{
    public class Player
    {
        public Player()
        {

        }
        //public Player(string Name)
        //{
        //    this.Id = Guid.NewGuid();
        //    this.PlayerName = Name;
        //    this.PlayerCards = new List<Card>(); //First Creating the Empty List of Cards Collection
        //    this.PlayerSortedCards = new List<Card>(); 
        //}

        [Key]
        public Guid Id { get; set; }
        public string PlayerName { get; set; }
        //public List<Card> PlayerCards { get; set; }
        //public List<Card> PlayerSortedCards { get; set; }

    }
}