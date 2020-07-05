import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader.service';



@NgModule({
  declarations: [ LoaderComponent ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  providers: [ LoaderService ],
  entryComponents: [ LoaderComponent ]
})
export class LoaderModule { }
