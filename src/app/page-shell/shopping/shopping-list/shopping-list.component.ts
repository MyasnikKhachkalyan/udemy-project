import { Component, OnInit } from '@angular/core';
import {Ingredient, IngredientModel} from '../../../../../models/ingredient.model';
import {ShoppingListService} from '../../../services/shopping-list.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: IngredientModel[] = [];

  constructor(private readonly shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.getIngredients().subscribe();
  }

  getIngredients(): Observable<IngredientModel[]> {
    return this.shoppingListService.getIngredients().pipe(
      tap((data) => this.ingredients = data)
    );
  }
}
