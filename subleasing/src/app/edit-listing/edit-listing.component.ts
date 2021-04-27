import { Component, OnInit, Input, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {ListingModel} from '../listing-card/listing-model'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {

  @Input() public editor : ListingModel;

  URL = "http://localhost:3000/ownedListings";

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.editor = {_id: -1,
                    ownerID: "-1",
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
    console.log(this.editor);
  }

  public checkChange(): void{
    this.editor.centralAir = !this.editor.centralAir;
  }

  public saveChanges(): void{
    const body = this.editor;
    console.log("Updating listing "+JSON.stringify(body));
    const headers = { 'content-type': 'application/json'};
    this.http.put(this.URL, body, {'headers':headers}).subscribe((data) => {
      var results = (data as any);
      console.log("put request successful: "+JSON.stringify(results));

      var alertHTML = `<div class="alert alert-success fade show" style="display:inline;"role="alert" id="alertBox">
        Saved!
        <button type="button" class="close btn-sm alert-success" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;

      var alertElem = document.getElementById("alertBox");
      if (alertElem == null){
        document.getElementById("saveButton")!.insertAdjacentHTML('afterend', alertHTML);
      }
    });
  }
}
