import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipesService} from './recipes.service';
import {RecipeModel} from '../../../models/recipe.model';
import {map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseBackService {

  constructor(private readonly http: HttpClient, private readonly recipesService: RecipesService) { }

  getRecipes(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>('https://ng-udemy-app-69619.firebaseio.com/recipes.json').pipe(
      map((recipes): RecipeModel[] => recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      })),
      tap((recipes) => this.recipesService.rowRecipes = recipes)
    );
  }

  putRecipes(): Observable<RecipeModel[]> {
    return this.http.put<RecipeModel[]>('https://ng-udemy-app-69619.firebaseio.com/recipes.json', this.recipesService.rowRecipes);
  }
}
