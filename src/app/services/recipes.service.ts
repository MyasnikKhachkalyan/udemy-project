import {EventEmitter, Injectable} from '@angular/core';
import {Recipe, RecipeModel} from '../../../models/recipe.model';
import {Observable, of} from 'rxjs';
import {Ingredient} from '../../../models/ingredient.model';

// const initialRecipes = [
//   new Recipe('The potato tomato recipe',
//     'The best recipe ever',
     // tslint:disable-next-line:max-line-length
//     'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2020/03/thai-green-tofu-noodles.jpg?itok=1MTaMK02',
//     [
//       new Ingredient('potatoes', 3),
//       new Ingredient('tomatoes', 2)
//     ]),
//   new Recipe('The banana orange recipe', 'The second best recipe ever',
     // tslint:disable-next-line:max-line-length
//     'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2020/03/thai-green-tofu-noodles.jpg?itok=1MTaMK02',
//     [
//       new Ingredient('banana', 4),
//       new Ingredient('orange', 5)
//     ]),
//   new Recipe('The milk bread', 'The third best recipe ever',
     // tslint:disable-next-line:max-line-length
//     'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2020/03/thai-green-tofu-noodles.jpg?itok=1MTaMK02',
//     [
//       new Ingredient('milk', 3),
//       new Ingredient('bread', 2)
//     ]),
// ];

const initialRecipes: RecipeModel[] = [];
@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  getRecipes(): Observable<Recipe[]> {
    return of(initialRecipes);
  }

  addRecipe(recipe: Recipe) {
    initialRecipes.unshift(recipe);
  }

  getRecipe(id: number): Observable<Recipe> {
    return of(initialRecipes[id]);
  }

  editRecipe(recipe: RecipeModel, id: number) {
    initialRecipes[id] = recipe;
  }

  deleteRecipe(id: number) {
    initialRecipes.splice(id, 1);
  }

  get rowRecipes(): RecipeModel[] {
    return initialRecipes;
  }

  set rowRecipes(recipes) {
    initialRecipes.splice(0, initialRecipes.length);
    initialRecipes.push(...recipes);
  }
}
