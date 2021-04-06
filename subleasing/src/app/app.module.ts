import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListingCardComponent } from './listing-card/listing-card.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListingCardComponent,
    MessageBoxComponent,
    EditListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
