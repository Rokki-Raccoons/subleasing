import { Component, OnInit } from '@angular/core';
import {MessageBoxComponent} from '../message-box/message-box.component'
import {EditListingComponent} from '../edit-listing/edit-listing.component'
import {HeaderComponent} from '../header/header.component'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-renter-view',
  templateUrl: './renter-view.component.html',
  styleUrls: ['./renter-view.component.css']
})
export class RenterViewComponent implements OnInit {
  msg = new FormControl('');
  constructor() { }

  ngOnInit(): void {
  }

  saveMsg(){
    
  }

}
