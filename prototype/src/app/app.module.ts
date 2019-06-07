import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { MaterialModule } from './layouts/material.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './auth/create-user/create-user.component';
import { LoginComponent } from './auth/login/login.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AdminLayoutModule,
    AppRoutingModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginComponent,
    AlertComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
