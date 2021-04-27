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

  constructor(private route: ActivatedRoute) {
    this.editor = {_id: -1,
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
      // this.route.queryParams.subscribe(params=>{
      // this.price = params.price;
      // this.address = params.address;
      // this.link = params.link;

      console.log(this.editor);
   
  }

  checkChange(): void{
    this.editor.centralAir = !this.editor.centralAir;
  }

}
