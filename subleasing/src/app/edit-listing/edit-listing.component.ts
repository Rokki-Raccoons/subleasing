import { Component, OnInit, Input, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {EditModel} from './edit-model'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {

  @Input() public editor : EditModel;

  address = "Default Address";
  photoRef = "no photo found";
  price = -1.0;
  beginDate= "";
  endDate= "";
  link= "";
  beds = -1.0;
  baths = -1.0;
  details = "Other Relevant Details";
  listingId = -1.0;

  constructor(private route: ActivatedRoute) {
    this.editor = {address: "-",
                    photoRef: "no photo",
                    price: 0,
                    beginDate: "",
                    endDate: "",
                    link: "",
                    beds: 0,
                    baths: 0,
                    details: "-",
                    listingId: 0};
  }

  ngOnInit(): void {
      // this.route.queryParams.subscribe(params=>{
      // this.price = params.price;
      // this.address = params.address;
      // this.link = params.link;

      console.log(this.editor);
      this.address = this.editor.address;
      this.photoRef = this.editor.photoRef;
      this.price = this.editor.price;
      this.beginDate = this.editor.beginDate;
      this.endDate = this.editor.endDate;
      this.link = this.editor.link;
      this.beds = this.editor.beds;
      this.baths = this.editor.baths;
      this.details = this.editor.details;
      this.listingId = this.editor.listingId;
   
  }

}
