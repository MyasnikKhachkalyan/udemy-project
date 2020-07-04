import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageShellComponent} from './page-shell.component';
import {ShoppingListComponent} from '../shopping/shopping-list/shopping-list.component';
import {RecipesResolverService} from '../services/recipes.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PageShellComponent,
    children: [
      {
        path: 'shopping-list',
        loadChildren: () => import('../shopping/shopping.module').then((m) => m.ShoppingModule)
      },
      {
        path: 'recipes',
        loadChildren: () => import('../recipes/recipes.module').then((m) => m.RecipesModule),
        resolve: {
          recipeList: RecipesResolverService
        }
      },
      {
        path: '' ,
        pathMatch: 'full',
        redirectTo: '/recipes'
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
