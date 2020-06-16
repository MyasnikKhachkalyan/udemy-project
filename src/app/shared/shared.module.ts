import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownDirective} from './dirictives/dropdown.directive';



@NgModule({
  declarations: [ DropdownDirective ],
  exports: [ DropdownDirective ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
