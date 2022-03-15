import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/shared/models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  // Initialize the required data
  @Input()
  card: Card;

  @Input()
  cardsInMiddle: Card[];

  @Input()
  renderOnlyStack: boolean;
  
  constructor() { }

  ngOnInit(): void {

    console.log('card: ', this.card);
  }

}
