import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {LoggedInGuard} from './services/logged-in.guard';
import {NotLoggedInGuard} from './services/not-logged-in.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NotLoggedInGuard],
    canLoad: [NotLoggedInGuard]
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
