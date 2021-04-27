import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListingsComponent } from './listings/listings.component';
import { RenterViewComponent } from './renter-view/renter-view.component';
import { LandingComponent } from './landing/landing.component';
import { DatavisComponent } from './datavis/datavis.component';
import {PathErrorPageComponent} from './path-error-page/path-error-page.component';

import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path: 'listings', component: ListingsComponent},
  {path: 'renterpage', component: RenterViewComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LandingComponent},
  {path: 'datavis', component: DatavisComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/listings', pathMatch: 'full'},
  {path: '**', component: PathErrorPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
