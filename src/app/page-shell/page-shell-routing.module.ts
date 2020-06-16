import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageShellComponent} from './page-shell.component';
import {ShoppingListComponent} from './shopping/shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: '',
    component: PageShellComponent,
    children: [
      {
        path: 'shopping-list',
        component: ShoppingListComponent
      },
      {
        path: 'recipes',
        loadChildren: () => import('./recipes/recipes.module').then((m) => m.RecipesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageShellRoutingModule {
}
