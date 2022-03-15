import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Board } from 'src/app/shared/models/board.model';
import { Card } from 'src/app/shared/models/card.model';
import { Deck } from 'src/app/shared/models/deck.model';
import { Player } from 'src/app/shared/models/player.model';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  // Initialize the required data
  // CONSTANTS
  private MAX_PLAYERS = 7;
  private MIN_PLAYERS = 3;
  private CARDS_DEALT = 3;

  // FLAG ASSETS
  isGameStarted: boolean = true;
  isGameStartedByPlayer: boolean = false;
  isGameOver: boolean = false;
  isPlayerCreated: boolean = false;
  disableGameStartButton: boolean = true;

  // GAME ASSETS
  cardsInMiddle: Card[] = []
  players: Player[] = []
  currentPlayer: number
  playerCount: any = this.MIN_PLAYERS;
  direction: number = 1;
  deck: Deck;

  // FORM ASSETS
  playerForm: FormGroup;
  defaultPlayerForm: FormGroup;


  // STATIC DATA
  playerCountList: any[] = [
    // { id: 2, displayName: 'Two' },
    { id: 3, displayName: 'Three' },
    // { id: 4, displayName: 'Four' },
    // { id: 5, displayName: 'Five' }
  ];

  playerNameList: any[] = [];
  
  constructor(private fb: FormBuilder,
    private _toastr: ToastrService, 
    private _cardService: CardService) { }


  // Life Cycle 
  ngOnInit(): void {

    this.playerForm = this.fb.group({
      playerCount: [this.MIN_PLAYERS, Validators.required],
      playerName1: ['RAJ THOMAS', Validators.required],
      playerName2: ['FRIEND', Validators.required],
      playerName3: ['NEW FRIEND', Validators.required],
      // playerName4: ['NEW FRIEND', Validators.required],
      // playerName5: ['NEW FRIEND', Validators.required],
    });

    this.defaultPlayerForm = this.playerForm.value;
    
  }

  ngOnDestroy() : void {
    this.onClickResetPlayerNames(); 
  }


  // Invoker of the game
  init(): void {
    let board = new Board();

    //board.onStartGame('TestPlayer1', 'TestPlayer2'); //this is hard-coded. Below code is somewhat dynamic but not fullylet 

    let displayPlayerNameList  = this.playerNameList.map(x => x.displayName);
    //board.onStartGame(this.playerNameList[0].displayName, this.playerNameList[1].displayName);
    board.onStartGame(displayPlayerNameList);

    this.cardsInMiddle = board.cardsInMiddle;
    this.players = board.players;
    this.currentPlayer = 0;
    
    // hard-coded to get sorted cards for indiv players
    //let secondPlayer = 1;
    // let result = this.postPrioritySortedCard(this.currentPlayer, this.players[this.currentPlayer].playerCards);
    // let result2 = this.postPrioritySortedCard(secondPlayer, this.players[secondPlayer].playerCards);

    // dynamically players cards will be evaluated and dumped in the respective players array
    for(let i = 0; i < this.players.length; i++){
      this.postPrioritySortedCard(i, this.players[i].playerCards);
    }

  
  }

  // When user plays a card
  cardPlayed(): void {
    // write logic when a card is being played by the player 
    // This is not required at this point of time
    // Out of scope for this POC
  }

  // Button click Event captured
  onButtonClickStartGame(){
    this.disableGameStartButton = true;
    this.isGameStartedByPlayer = true;

    this.init();
  }

  onButtonClickSortCard(value : number) : void {
    // alert('API will be invoked for sorting the cards!!');

    let playerIndex = value - 1;
    if(playerIndex >= 0){
      this.postPrioritySortedCard(playerIndex, this.players[playerIndex].playerCards);
    }
    else{
      this._toastr.success('Operation Failed', 'No data found for which the cards can be done.');
      // alert('No Player Found For Whom The Cards Can be sorted!!!');
      return;
    }
  }

  onButtonClickRemoveSortedCard(value : number) : void {
    let playerIndex = value - 1;
    if(playerIndex >= 0 && this.players[playerIndex].playerSortedCards.length !== 0){
      this.players[playerIndex].playerSortedCards = [];

      this._toastr.info('Operation Successful', `Sorted cards are removed for Player ${value}.`);
    }
    else{
      this._toastr.info('Completed', 'Sorted Cards do not exist.');
      // alert('No Player Found For Whom The sorted cards Can be removed.');
      return;
    }
  }

  onClickReShuffleCards() {
    this.init();
  }

  // Dropdown events captured
  onDropDownChangePlayerCount(e: any){
    // console.log(e.target.value);
  }

  // Forms Events Captured
  onReactiveFormSubmitCreatePlayer(){
    // Player Reactive Form Submit
    console.log(this.playerForm.value);
    this.createPlayer(this.playerForm.value as Player);
  }

  onNgFormSubmitCreatePlayer(playerForm: NgForm){
    // Player Ng Form Submit
    console.log(playerForm.form.value);
    this.createPlayer(playerForm.form.value as Player);
  }

  // Clean up code
  onClickResetPlayerNames() {
    //reseting the flags
    this.isPlayerCreated =  false;
    this.disableGameStartButton = true;  

    // reseting the form with default values
    // this.playerForm.reset();
    this.playerForm.setValue(this.defaultPlayerForm);

    // reseting the cards, players and assets
    this.playerCount = this.MIN_PLAYERS;
    this.playerNameList = [];
    this.cardsInMiddle = [];
    this.players = [];
    this.currentPlayer = 1;

    this._toastr.info('Reset completed', 'Game reset completed.');
  }

  // Player Events Captured When Emitted
  whenAdded() : void {
    if (this.playerCount < this.MAX_PLAYERS)
      this.playerCount++;
  }

  whenRemoved() : void {
    if (this.playerCount > this.MIN_PLAYERS)
      this.playerCount--;
  }

  whenStarted() : void {
    console.log("Starting");
    this.players = [];
    this.cardsInMiddle = [];
    this.currentPlayer = 1;
    this.isGameOver = false;
    this.direction = 1;

    this.deck = new Deck()
    // For each player
    for (let i = 0; i < this.playerCount; i++) {
      this.players[i].playerCards = []
      // Take out 7 cards
      for (let cardNum = 0; cardNum < this.CARDS_DEALT; cardNum++) {
        this.players[i].playerCards[cardNum] = this.deck.takeCard();
      }
    }
  }

 // This is to call service and in-turn invoke API
  postPrioritySortedCard(playerIndex: number, cards : Card[]) {
    this._cardService.postPrioritySortedCard(cards).subscribe(
      res => {
        this._toastr.success('API response successful', 'Cards sort completed successfully using API.');
        this.players[playerIndex].playerSortedCards = res as Card[];
      },
      err => { 
        
        this._toastr.error('Server Error', 'HttpErrorResponse: API Response Failed.');
        console.error(err); 
      }
    );
  }

  // create player
  createPlayer(value: any) {
    // this will create player
    this.isPlayerCreated = true;
    this.disableGameStartButton = false;

    // this.playerNameList.push({ id: this.playerNameList.length + 1, displayName: value.playerName1 });
    // this.playerNameList.push({ id: this.playerNameList.length + 1, displayName: value.playerName2 });

    for (const property in value) {
      if(property.toLowerCase().includes('playername'))
        this.playerNameList.push({ id: this.playerNameList.length + 1, displayName: value[property] });
    }

    this._toastr.info('Players Created Successfully', 'Please click on "Start Card Game" button from the top section.');
    // alert('Please click on "Start Card Game" button from the top section!');

  }



}
