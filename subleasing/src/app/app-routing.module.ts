import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {EditListingComponent} from './edit-listing/edit-listing.component';
import {ListingCardComponent} from './listing-card/listing-card.component';
import {MessageBoxComponent} from './message-box/message-box.component';
import { ListingsComponent } from './listings/listings.component';
import { RenterViewComponent } from './renter-view/renter-view.component';
import { LandingComponent } from './landing/landing.component';
import { DatavisComponent } from './datavis/datavis.component';

const routes: Routes = [
  {path: 'header-component', component: HeaderComponent},
  {path: 'edit-listing-component', component: EditListingComponent},
  {path: 'listing-card-component', component: ListingCardComponent},
  {path: 'message-box-component', component: MessageBoxComponent},
  {path: 'listings', component: ListingsComponent},
  {path: 'renterpage', component: RenterViewComponent},
  {path: 'login', component: LandingComponent},
  {path: 'datavis', component: DatavisComponent},
  {path: '', component: ListingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
