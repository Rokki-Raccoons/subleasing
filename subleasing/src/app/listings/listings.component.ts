import { Component, OnInit } from '@angular/core';
import {ListingCardComponent} from '../listing-card/listing-card.component';
import {HeaderComponent} from '../header/header.component';
import {ListingModel} from '../listing-card/listing-model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  URL = "http://localhost:3000/searchListings";
  listings: Array<ListingModel> = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getListings();
  }

  public getListings(){
    this.http.get(this.URL).subscribe((data) => {
      var results = (data as any);
      //console.log(results);
      for (var i = 0; i < results.length; ++i) {
        var newData = results[i];
        newData["favoriteStatus"] = false;
        this.listings.push(newData);
      }
      console.log(this.listings);
    });
  }

}
