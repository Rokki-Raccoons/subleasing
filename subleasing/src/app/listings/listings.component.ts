import { Component, OnInit } from '@angular/core';
import {ListingCardComponent} from '../listing-card/listing-card.component';
import {HeaderComponent} from '../header/header.component'

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
