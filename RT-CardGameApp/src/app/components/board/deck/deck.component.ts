import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/shared/models/card.model';
import { Player } from 'src/app/shared/models/player.model';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  // Initialize the required data
  @Input()
  players: Player[]

  @Input()
  cardsInMiddle: Card[]
 
  @Input()
  currentPlayer: number

  @Output()
  cardPlayed: EventEmitter<{[key: string]: number}> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  cardClicked(info: {[key: string]: number}) {
    this.cardPlayed.emit(info);
  }


}
