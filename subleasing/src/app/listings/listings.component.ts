import { Component, OnInit } from '@angular/core';
import {ListingCardComponent} from '../listing-card/listing-card.component';
import {HeaderComponent} from '../header/header.component';
import {ListingModel} from '../listing-card/listing-model';
import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  URL = "http://localhost:3000/searchListings";
  listings: Array<ListingModel> = [];
  saved: Array<ListingModel> = [];
  pageNumber = 0;
  maxPage = -1;
  search = new SearchModel("");

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getListings();
  }

  public getListings(){
    const headers = { 'content-type': 'application/json'};
    const options = {'headers':headers, 'params':{'searchText':this.search.searchBody, 'page':this.pageNumber.toString()}};
    this.listings = [];

    this.http.get(this.URL, options).subscribe((data) => {
      var results = (data as any);
      //console.log(results);
      this.maxPage = Math.floor(results.count/4);
      for (var i = 0; i < results.limitedData.length; ++i) {
        var newData = results.limitedData[i];
        newData["favoriteStatus"] = false;
        this.listings.push(newData);
      }
      console.log(this.listings);
      console.log("page "+this.pageNumber+"/"+this.maxPage);
      if (this.pageNumber <= 0){
        document.getElementById("prevButton")!.setAttribute("disabled","true");
        console.log("prev is disabled");
      }
      else{
        document.getElementById("prevButton")!.removeAttribute("disabled");
        console.log("prev is enabled");
      }
      if (this.pageNumber >= this.maxPage){
        document.getElementById("nextButton")!.setAttribute("disabled","true");
        console.log("next is disabled");
      }
      else {
        document.getElementById("nextButton")!.removeAttribute("disabled");
        console.log("next is enabled");
      }
    });

  }

  public prevPage(){
    if (this.pageNumber > 0){
      this.pageNumber--;
      this.getListings();
    }
  }

  public nextPage(){
    if (this.pageNumber < this.maxPage){
      this.pageNumber++;
      this.getListings();
    }
  }

  public searchListings(){
    this.pageNumber = 0;
    this.getListings();
  }

}

export class SearchModel {
  constructor( public searchBody: string){}
}