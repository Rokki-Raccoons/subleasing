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
  favURL = "http://localhost:3000/favorites";
  listings: Array<ListingModel> = [];
  favListings: Array<ListingModel> = [];
  pageNumber = 0;
  maxPage = -1;
  search = new SearchModel("");
  noDocumentsFound = "No results found";

  user = "607fca1679c613ca848cd72e";



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.user)
    this.getUsername();

    setTimeout(() => {
      console.log("beforepopulate" + this.user)
      this.populateData();
    }, 200);
  }

  public populateData(){
    const headers = { 'content-type': 'application/json'};
    this.getUsername();
    const options = {'headers':headers, 'params':{'user':this.user}};
    this.listings = [];

    this.http.get(this.favURL, options).subscribe((data) => {
      var results = (data as any);  // want to make sure favorites is saved before making the
      for (var i = 0; i < results.length; ++i) {
        var newData = results[i];
        newData["favoriteStatus"] = true;
        this.favListings.push(newData);
      }
      //console.log(this.favListings);
      this.getListings();
    });
  }

  public getUsername(){
    this.http.get('/authenticate').subscribe(data => {
      var authStatus = (data as any);
      this.user = authStatus.userid;
      console.log("getusername "  +  this.user);
    });
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
        if (this.checkFavStatus(this.favListings, newData)){
          newData["favoriteStatus"] = true;
        }
        this.listings.push(newData);
      }
      console.log(this.listings);
      console.log("page "+this.pageNumber+"/"+this.maxPage);
      if (results.limitedData.length == 0){
        this.noDocumentsFound = "No results found";
      }
      else {
        this.noDocumentsFound = "";
      }
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

  private checkFavStatus(arr:Array<ListingModel>, val:ListingModel) {
    return arr.some(function(arrVal) {
      return val._id == arrVal._id;
    });
  }

}

export class SearchModel {
  constructor( public searchBody: string){}
}
