export class Card {


    //Note:: 13th March 2022
    //The role of the card class is just to create an instnace of Card and give it to the caller for usage
    //No other opeartion will be done here
    suit: string;
    rank: string;
    value: number;

    constructor(suit: string, rank: string, value: number) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }
}
