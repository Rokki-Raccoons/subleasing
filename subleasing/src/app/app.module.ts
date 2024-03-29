import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListingCardComponent } from './listing-card/listing-card.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { ListingsComponent } from './listings/listings.component';
import { RenterViewComponent } from './renter-view/renter-view.component';
import { LandingComponent } from './landing/landing.component';
import { DatavisComponent } from './datavis/datavis.component';
import { PathErrorPageComponent } from './path-error-page/path-error-page.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListingCardComponent,
    MessageBoxComponent,
    EditListingComponent,
    ListingsComponent,
    RenterViewComponent,
    LandingComponent,
    DatavisComponent,
    PathErrorPageComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
