import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageShellComponent } from './page-shell.component';
import { ShellHeaderComponent } from './shell-header/shell-header.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {PageShellRoutingModule} from './page-shell-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [PageShellComponent, ShellHeaderComponent],
  exports: [
    PageShellComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    PageShellRoutingModule
  ]
})
export class PageShellModule { }
