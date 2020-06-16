import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel} from '../../../../../models/recipe.model';
import {RecipesService} from '../../../services/recipes.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ShoppingListService} from '../../../services/shopping-list.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: RecipeModel;
  id: number;
  constructor(private readonly recipesService: RecipesService, private readonly shoppingListService: ShoppingListService,
              private readonly activatedRoute: ActivatedRoute, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.getSelectedRecipe().subscribe();
  }

  getSelectedRecipe(): Observable<RecipeModel> {
    return this.activatedRoute.params.pipe(
      map((params) => {
        this.id = +params.id;
        return this.id;
      }),
      switchMap((id) => this.recipesService.getRecipe(id)),
      tap((recipe) => this.recipe = recipe)
    );
  }

  toShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
    this.router.navigate(['/', 'shopping-list']);
  }

  onDelete() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['/', 'recipes']);
  }
}
