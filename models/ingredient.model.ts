export interface IngredientModel {
  name: string;
  amount: number;
}

export class Ingredient implements IngredientModel {
  constructor(public name: string, public amount: number) {
  }
}
