import { Card } from "./card.model";

export class Deck {


    //Note:: 13th March 2022
    //The role of the deck class is to create an instnace of Deck and give it to the caller for usage

    cards : Card[];
    
    constructor() {
        this.cards = [];    
    }  

    createDeck() : void {
        // Pre-seed mock data 
        // let suits = ['clubs', 'diamonds', 'hearts', 'spades'];
        // let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

        // Here we are creating all the special cards
        let specialSuits = ['SC']; 
        let specialRanks = ['4T', '2T', 'ST', 'PT', 'RT'];
        // let specialValues = [15, 16, 17, 18, 19];
        let specialValues = [1, 2, 3, 4, 5];
        let scoreForEachSuit = 100;

        for (let i = 0; i < specialSuits.length; i++) {

            for (let j = 0; j < specialRanks.length; j++) {
                let calcValue = scoreForEachSuit + specialValues[j];
                this.cards.push(new Card(specialSuits[i], specialRanks[j], calcValue));
            }
            scoreForEachSuit += 100;
        }

        // Here we are creating all the standard cards 
        //let suits = ['♦', '♣', '♠', '♥']; 
        let suits = ['D', 'S', 'C', 'H']; 
        let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        scoreForEachSuit = 2200;

        for (let i = 0; i < suits.length; i++) {

            for (let j = 0; j < ranks.length; j++) {
                let calcValue = scoreForEachSuit + values[j]; 
                //this.cards.push(new Card(suits[i], ranks[j],  values[j]));
                this.cards.push(new Card(suits[i], ranks[j], calcValue));
            }
            scoreForEachSuit += 100;
        }
    }

    // This will suffle the deck of cards
    shuffleDeck() : void {
        let randomIndex1, randomIndex2, tempIndex;
        for (let i = 0; i < 1000; i++) {
            randomIndex1 = Math.floor((Math.random() * this.cards.length));
            randomIndex2 = Math.floor((Math.random() * this.cards.length));
            tempIndex = this.cards[randomIndex1];
            this.cards[randomIndex1] = this.cards[randomIndex2];
            this.cards[randomIndex2] = tempIndex;
        }
    }

    takeCard() : Card {
        return this.cards.pop() as Card;
    }

}
