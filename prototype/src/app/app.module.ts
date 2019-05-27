import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { AppComponent } from './app.component';
import { GitComponent } from './git/git.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    AdminLayoutModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    GitComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
