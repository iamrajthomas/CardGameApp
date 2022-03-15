import { Card } from "./card.model";
import { Deck } from "./deck.model";
import { Player } from "./player.model";

export class Board {

    //Note:: 13th March 2022
    //The role of the board class is just to create an instnace of Board and give it to the caller for usage
    //Board only can start a game with players data in place

    // private CARDS_DEALT = 3;
    private MAX_PLAYERS = 7;
    private MIN_PLAYERS = 2;
    private TOTAL_CARDS = 57;
    private SLICE_START: number = 0;
    //private SLICE_MIDDLE: number = 11;
    private SLICE_OFFSET: number = 11;
    private SLICE_END: number = this.SLICE_OFFSET;

    public cardsInMiddle : Card[];
    public players : Player[];
    public deck: Deck;
    
    constructor() {
        this.cardsInMiddle = [];
        this.players = [];
        this.deck = new Deck();
    }

    //onStartGame(playerOneName: string, playerTwoName: string){
    onStartGame(playerNames: string[]) {

        // this.players.push(new Player(playerOneName));
        // this.players.push(new Player(playerTwoName));
        for(let i = 0; i< playerNames.length; i ++){
            this.players.push(new Player(playerNames[i]));
        }

        // this.deck = new Deck();
        this.deck.createDeck();
        this.deck.shuffleDeck();

        // Hard-coded players cards here
        // this.players[0].playerCards = this.deck.cards.slice(this.SLICE_START, this.SLICE_MIDDLE);
        // this.players[1].playerCards = this.deck.cards.slice(this.SLICE_MIDDLE, this.SLICE_MIDDLE + this.SLICE_OFFSET);
        // this.cardsInMiddle = this.deck.cards.slice(this.SLICE_END);
        
        // Dynamically players cards distribution done here
        // this.players.length = 0; //Testing Purpose
        for(let i = 0; i < this.players.length; i++){
            this.players[i].playerCards = this.deck.cards.slice(this.SLICE_START, this.SLICE_END);
            this.SLICE_START = this.SLICE_END;

            // handling the slice_end for the last iteration so that can make use of it for cards in middle
            if(i < this.players.length - 1)
                this.SLICE_END = this.SLICE_END + this.SLICE_OFFSET;
        }

        this.cardsInMiddle = this.players.length <= 0 ? this.deck.cards.slice(0) : this.deck.cards.slice(this.SLICE_END);        
    }

}
//         0   1  2
// start   0   11 33 
// end     11  22 44 