import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page-shell/page-shell.module').then((m) => m.PageShellModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
