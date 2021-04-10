import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {EditListingComponent} from './edit-listing/edit-listing.component';
import {ListingCardComponent} from './listing-card/listing-card.component';
import {MessageBoxComponent} from './message-box/message-box.component';

const routes: Routes = [
  {path: 'header-component', component: HeaderComponent},
  {path: 'edit-listing-component', component: EditListingComponent},
  {path: 'listing-card-component', component: ListingCardComponent},
  {path: 'message-box-component', component: MessageBoxComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
