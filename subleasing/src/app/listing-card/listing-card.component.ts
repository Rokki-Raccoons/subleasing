import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ListingModel} from './listing-model'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css']
})

export class ListingCardComponent implements OnInit {

  @Input() public listing : ListingModel;

  constructor(private http : HttpClient) {
    this.listing = {_id: -1,
                    ownerId: -1,
                    address: "",
                    price: -1,
                    photoRef: "",
                    startLease: "",
                    endLease: "",
                    details: "",
                    beds: -1,
                    baths: -1,
                    kitchens: -1,
                    centralAir: false,
                    sqft: -1,
                    favoriteStatus: false};
  }
  ngOnInit(): void {
    // console.log(this.listing);
  }

  ngAfterViewInit(): void{
    var modal = document.getElementById(this.listing._id.toString());
    modal!.setAttribute("data-target", "#"+this.listing._id+'-modal');
  }

  favClick(target: any):void {
    var add = true;
    var t = (target as HTMLElement);
    if (t.classList.contains("bi-star-fill")){
      t.classList.remove("bi-star-fill");
      t.classList.add("bi-star");
      add = false;
    }
    else{
      t.classList.remove("bi-star");
      t.classList.add("bi-star-fill");
      add = true;
    }
    if(add){
      this.http.get('/addfav/' + this.listing._id).subscribe(data => {});
    }else{
      this.http.get('/removefav/' + this.listing._id).subscribe(data => {});
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
