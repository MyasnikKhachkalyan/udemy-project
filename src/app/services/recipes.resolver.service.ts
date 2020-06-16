import { Injectable } from '@angular/core';
import {FirebaseBackService} from './firebase-back.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {RecipeModel} from '../../../models/recipe.model';
import {Observable, of} from 'rxjs';
import {RecipesService} from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<RecipeModel[]> {
  constructor(private readonly firebaseBackService: FirebaseBackService, private readonly recipesService: RecipesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeModel[]> | Promise<RecipeModel[]> | RecipeModel[] {
    return this.recipesService.rowRecipes.length ? of(this.recipesService.rowRecipes) : this.firebaseBackService.getRecipes();
  }
}
