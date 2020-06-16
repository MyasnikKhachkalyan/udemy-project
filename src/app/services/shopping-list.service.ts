import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient, IngredientModel} from '../../../models/ingredient.model';
import {Observable, of} from 'rxjs';

const ingredients: IngredientModel[] = [
  new Ingredient('Apples', 5),
  new Ingredient('Tomatoes', 10),
];
@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  selectIngredient = new EventEmitter<IngredientModel>();

  getIngredients(): Observable<IngredientModel[]> {
    return of(ingredients);
  }

  addIngredient(ingredient: IngredientModel): void {
    const ing = ingredients.find((ingred) => ingred.name === ingredient.name);
    !!ing ? ing.amount += ingredient.amount : ingredients.unshift(ingredient);
  }

  addIngredients(ings: IngredientModel[]): void {
    ingredients.unshift(...ings);
  }

  deleteIngredient(ingredient: IngredientModel): void {
    const ind = ingredients.findIndex((ing) => ing.name === ingredient.name);
    ingredients.splice(ind, 1);
  }
}
