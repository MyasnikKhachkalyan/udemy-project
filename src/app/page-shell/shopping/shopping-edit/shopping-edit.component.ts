import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IngredientModel} from '../../../../../models/ingredient.model';
import {ShoppingListService} from '../../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  mainForm = new FormGroup({
    name: new FormControl(null),
    amount: new FormControl(null)
  });

  constructor(private readonly shoppingListService: ShoppingListService) {
  }

  onDelete() {

  }

  onAdd() {
    this.shoppingListService.addIngredient(this.mainForm.value);
    this.clear();
  }

  clear() {
    this.mainForm.setValue({
      name: null,
      amount: null
    });
  }
}
