import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { BrowseComponent } from './browse/browse.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'browse', component: BrowseComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }