import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ModalModule } from '../modal/modal.module';



@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    ModalModule
  ]
})
export class AlertModule { }
