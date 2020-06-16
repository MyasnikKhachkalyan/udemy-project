import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {LoggedInGuard} from './services/logged-in.guard';
import {NotLoggedInGuard} from './services/not-logged-in.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: '',
    loadChildren: () => import('./page-shell/page-shell.module').then((m) => m.PageShellModule),
    canLoad: [LoggedInGuard],
    canActivate: [LoggedInGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
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
