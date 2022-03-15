import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  public cardList: Array<Card>;
  //readonly baseURL = 'http://localhost:7799/api/Card/PostPrioritySortedCard';

  // This is for the Azure Deployed API URL -- Working fine!!!
  readonly baseURL = `/API/api/Card/PostPrioritySortedCard`;

  constructor(private http: HttpClient) { }
  
  postPrioritySortedCard(cards : Card[]) {
    return this.http.post(this.baseURL, cards);
  }

}
