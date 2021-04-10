import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ListingModel} from './listing-model'

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css']
})
export class ListingCardComponent implements OnInit {

  // @Input() public listing : ListingModel;

  address = "Default Address";
  photoRef = "no photo found";
  price = -1.0;
  beds = -1.0;
  baths = -1.0;
  details = "Other Relevant Details";
  listingId = -1.0;

  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
    this.price = params.price;
    this.address = params.address;
    this.beds = params.beds;
    this.baths = params.baths;
    this.details = params.details;
  });
  
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
