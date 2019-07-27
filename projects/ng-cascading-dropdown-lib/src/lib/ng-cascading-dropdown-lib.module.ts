import { NgModule } from '@angular/core';
import { NgCascadingDropdownLibComponent } from './ng-cascading-dropdown-lib.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgCascadingDropdownLibComponent],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [NgCascadingDropdownLibComponent]
})
export class NgCascadingDropdownLibModule { }
