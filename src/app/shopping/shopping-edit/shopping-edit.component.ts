import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IngredientModel} from '../../../../models/ingredient.model';
import {ShoppingListService} from '../../services/shopping-list.service';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  mainForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
  });

  constructor(private readonly shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.shoppingListService.selectIngredient.pipe(
      filter((ing) => !!ing),
      tap((ing) => this.mainForm.patchValue(ing))
    ).subscribe();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.mainForm.value);
    this.clear();
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
