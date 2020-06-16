import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel} from '../../../../../models/recipe.model';
import {RecipesService} from '../../../services/recipes.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ShoppingListService} from '../../../services/shopping-list.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: RecipeModel;
  constructor(private readonly recipesService: RecipesService, private readonly shoppingListService: ShoppingListService,
              private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getSelectedRecipe().subscribe();
  }

  getSelectedRecipe(): Observable<RecipeModel> {
    return this.activatedRoute.params.pipe(
      map((params) => +params.id),
      switchMap((id) => this.recipesService.getRecipe(id)),
      tap((recipe) => this.recipe = recipe)
    );
  }

  toShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
