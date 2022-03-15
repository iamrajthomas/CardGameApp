import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {


  // Note: For now, didn't  make use of this component
  // Can be used this component to create/render Players and their assets in the game

  @Input()
  playerCount: number;

  @Output()
  adding: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  removing: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  starting: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    this.adding.emit();
  }

  onRemove() {
    this.removing.emit();
  }

  onStart() {
    this.starting.emit();
  }

}
