import {IngredientModel} from './ingredient.model';

export interface RecipeModel {
  name: string;
  description: string;
  imgPath: string;
  ingredients: IngredientModel[];
}

export class Recipe implements RecipeModel {
  constructor( public name: string, public description: string, public imgPath: string, public ingredients: IngredientModel[]) {
  }
}
