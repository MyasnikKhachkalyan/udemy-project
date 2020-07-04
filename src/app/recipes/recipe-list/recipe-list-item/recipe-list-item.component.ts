import { Component, Input } from '@angular/core';

import { RecipeModel } from '../../../../../models/recipe.model';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent {
  @Input() recipe: RecipeModel;
  @Input() index: number;
}
