import { Component, OnInit, Input } from '@angular/core';

import {ListingModel} from './listing-model'

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css']
})
export class ListingCardComponent implements OnInit {

  @Input() public listing : ListingModel;

  address = "Default Address";
  photoRef = "no photo found";
  price = -1.0;
  beds = -1.0;
  baths = -1.0;
  details = "Other Relevant Details";
  listingId = -1.0;

  constructor() { 
    this.listing = {address: "-",
                    photoRef: "no photo",
                    price: 0,
                    beds: 0,
                    baths: 0,
                    details: "-",
                    listingId: 0};
  }

  ngOnInit(): void {
    console.log(this.listing);
    this.address = this.listing.address;
    this.photoRef = this.listing.photoRef;
    this.price = this.listing.price;
    this.beds = this.listing.beds;
    this.baths = this.listing.baths;
    this.details = this.listing.details;
    this.listingId = this.listing.listingId;
  }

  favClick(target: any):void {
    var t = (target as HTMLElement);
    if (t.classList.contains("bi-star-fill")){
      t.classList.remove("bi-star-fill");
      t.classList.add("bi-star");
    }
    else{
      t.classList.remove("bi-star");
      t.classList.add("bi-star-fill");
    }
  }

  showStar(card: any){
    var c = (card as HTMLElement);
    var icon = c.getElementsByTagName("i");
    icon[0].style.visibility = "visible";
  }

  hideStar(card: any){
    var c = (card as HTMLElement);
    var icon = c.getElementsByTagName("i");
    if (icon[0].classList.contains("bi-star")){
      icon[0].style.visibility = "hidden";
    }
  }

}
