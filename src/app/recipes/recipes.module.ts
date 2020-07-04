import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeListItemComponent } from './recipe-list/recipe-list-item/recipe-list-item.component';
import { RecipesComponent } from './recipes.component';
import {SharedModule} from '../shared/shared.module';
import {RecipesRoutingModule} from './recipes-routing.module';
import { RecipeNotSelectedComponent } from './recipe-not-selected/recipe-not-selected.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    RecipeDetailsComponent,
    RecipeListComponent,
    RecipeListItemComponent,
    RecipesComponent,
    RecipeNotSelectedComponent,
    RecipeEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecipesRoutingModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule { }
