import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {LoaderModule} from '../shared/loader/loader.module';
import {AlertComponent} from '../shared/alert/alert/alert.component';
import {AlertModule} from '../shared/alert/alert.module';

@NgModule({
  declarations: [ AuthComponent ],
  imports: [ CommonModule, ReactiveFormsModule, AuthRoutingModule, LoaderModule, AlertModule ],
  entryComponents: [ AlertComponent ]
})
export class AuthModule { }
