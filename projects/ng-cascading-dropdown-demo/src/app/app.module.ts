import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgCascadingDropdownLibModule } from 'ng-cascading-dropdown-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgCascadingDropdownLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
