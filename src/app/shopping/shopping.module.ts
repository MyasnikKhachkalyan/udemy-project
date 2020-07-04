import {NgModule} from '@angular/core';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {ShoppingRoutingModule} from './shopping-routing.module';

@NgModule({
  declarations: [ ShoppingEditComponent, ShoppingListComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ShoppingRoutingModule
  ]
})
export class ShoppingModule { }
