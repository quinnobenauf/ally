import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { ComponentsModule } from '../components/components.module';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { TableListComponent } from '../table-list/table-list.component';
import { TypographyComponent } from '../typography/typography.component';
import { IconsComponent } from '../icons/icons.component';
import { MapsComponent } from '../maps/maps.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { MaterialModule } from '../material.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminLayoutRoutingModule } from './admin-layout.routing';


@NgModule({
  imports: [
    CommonModule,
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
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    AdminLayoutComponent
  ]
})

export class AdminLayoutModule { }
