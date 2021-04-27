import { Component, OnInit, Input, NgModule } from '@angular/core';
import {MessageBoxComponent} from '../message-box/message-box.component';
import {EditListingComponent} from '../edit-listing/edit-listing.component';
import {HeaderComponent} from '../header/header.component';
import { HttpClient } from '@angular/common/http';
import {ListingModel} from '../listing-card/listing-model';
import {NgForm} from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-renter-view',
  templateUrl: './renter-view.component.html',
  styleUrls: ['./renter-view.component.css']
})

export class RenterViewComponent implements OnInit {

  msg = new FormControl('');

  URL = "http://localhost:3000/ownedListings";
  listings: Array<ListingModel> = [];
  hasMessage = false;
  message = "";
  noDocumentsFound = true;
  user = "607fca1679c613ca848cd72c"; // hardcoded for now, I will figure out how to
                                     // fix that when Kolby finishes auth stuff
  defaultListing = new ListingModel(0,this.user, "", 0, "", "", "", "", 0,0, 0, false, 0, false);
  chosenListing = new ListingModel(-1,this.user, "", -1, "", "", "", "", -1, -1, -1, false, -1, false);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getOwnedPropertiesData();
  }

  public getOwnedPropertiesData(){
    const headers = { 'content-type': 'application/json'};
    const options = {'headers':headers, 'params':{'user':this.user}};
    this.listings = [];

    this.http.get(this.URL, options).subscribe((data) => {
      var results = (data as any);
      console.log(results);
      for (var i = 0; i < results.length; ++i) {
        var newData = results[i];
        newData["favoriteStatus"] = false;
        this.listings.push(newData);
      }
      console.log(this.listings);
      if (results.length == 0){
        this.noDocumentsFound = true;
      }
      else {
        this.noDocumentsFound = false;
      }
    });
  }

  public chooseListingToEdit(target: any):void {
    var t = (target as HTMLElement);
    this.chosenListing = this.listings[parseInt(t.id)];
  }

  saveMsg(){


  }


  public chooseListingToDelete(target: any):void {
    var t = (target as HTMLElement);
    var tempListing = this.listings[parseInt(t.id)];
    const headers = { 'content-type': 'application/json'};
    const options = {'headers':headers, 'params':{'_id':tempListing._id.toString()}};

    console.log("DELETE options:"+JSON.stringify(options));
    this.http.delete(this.URL, options).subscribe((data) => {
      var results = (data as any);
      console.log("delete request returned: "+JSON.stringify(results));
      this.chosenListing._id = -1;
      this.getOwnedPropertiesData();
      location.reload();
    });
  }

  public createNew():void {
    const body = JSON.stringify(this.defaultListing);
    console.log("Posting new listing "+JSON.stringify(this.defaultListing));
    const headers = { 'content-type': 'application/json'};
    this.http.post(this.URL, body,{'headers':headers}).subscribe((data) => {
      var results = (data as any)[0];
      console.log("post request returned: "+JSON.stringify(results));
      this.chosenListing = results;
    });
  }

  public back():void{
    this.chosenListing._id = -1;
    this.getOwnedPropertiesData();
  }

}
