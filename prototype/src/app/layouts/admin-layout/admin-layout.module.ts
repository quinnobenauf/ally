import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { ComponentsModule } from '../components/components.module';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { EventsComponent } from '../events/events.component';

import { MaterialModule } from '../material.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminLayoutRoutingModule } from './admin-layout.routing';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    ComponentsModule,
    MaterialModule,
    AdminLayoutRoutingModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    EventsComponent,
    AdminLayoutComponent,
    
  ]
})

export class AdminLayoutModule { }
