import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Recipe, RecipeModel } from '../../../../models/recipe.model';
import {Observable} from 'rxjs';
import {RecipesService} from '../../services/recipes.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeModel[];

  constructor(private readonly recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.getRecipes().subscribe();
  }

  getRecipes(): Observable<Recipe[]> {
    return this.recipesService.getRecipes().pipe(
      tap((data) => this.recipes = data)
    );
  }

  addRecipe(): void {
    const recipeNumber = this.recipes.length + 1;
    this.recipesService.addRecipe(
      new Recipe(`The ${recipeNumber}-th recipe`, `the ${recipeNumber}-th best recipe ever`,
        // tslint:disable-next-line:max-line-length
        'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2020/03/pork-aubergine-noodle-stir-fry.jpg?itok=CmRLJqTD',
        [])
    );
  }
}
