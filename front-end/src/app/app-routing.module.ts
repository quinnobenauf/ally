import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { CreateEventComponent } from './create-event/create-event.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-event', component: CreateEventComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
