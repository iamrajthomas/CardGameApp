import { Card } from "./card.model";

export class Player {

    //Note:: 13th March 2022
    //The role of the player class is just to create an instnace of Player and give it to the caller for usage

    public playerName: string;
    public playerCards: Card[];
    public playerSortedCards: Card[];

    constructor(name: string) {
        this.playerName = name;
        this.playerCards = [] as Card[];
        this.playerSortedCards = [] as Card[];
    }
}
