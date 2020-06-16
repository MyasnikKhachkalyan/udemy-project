import { Injectable } from '@angular/core';
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

  constructor() { }

  getIngredients(): Observable<IngredientModel[]> {
    return of(ingredients);
  }

  addIngredient(ingredient: IngredientModel): void {
    ingredients.unshift(ingredient);
  }

  addIngredients(ings: IngredientModel[]): void {
    ingredients.unshift(...ings);
  }
}
