import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, switchMap, tap} from 'rxjs/operators';
import {RecipesService} from '../../../services/recipes.service';
import {RecipeModel} from '../../../../../models/recipe.model';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipe: RecipeModel;

  mainForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    imgPath: new FormControl(null, Validators.required),
    ingredients: new FormArray([], Validators.required)
  });

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly router: Router, private readonly recipesService: RecipesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      filter((params) => params.id),
      tap((params) => this.id = params.id + 1),
      switchMap(() => this.recipesService.getRecipe(this.id - 1)),
      tap((data) => this.recipe = data),
      tap(() => this.setFormValue(this.recipe))
    ).subscribe();
  }

  get ingredientsControls(): AbstractControl[] {
    return (this.mainForm.get('ingredients') as FormArray).controls;
  }

  setFormValue(recipe: RecipeModel) {
    const { ingredients } = recipe;
    this.mainForm.patchValue({
        ...this.mainForm.value,
        ...recipe,
        ingredients: []
      }
    );

    if (ingredients.length) {
      const ingControl = (this.mainForm.get('ingredients') as FormArray);
      for (const ing of ingredients) {
        ingControl.push(new FormGroup({
          name: new FormControl(ing.name, Validators.required),
          amount: new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
        }));
      }
    }
  }

  onDeleteIngredient(id: number) {
    (this.mainForm.get('ingredients') as FormArray).removeAt(id);
  }

  onAddIngredient() {
    (this.mainForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
      })
    );
  }

  onCancel() {
    this.mainForm.reset();
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onSubmit() {
    if (!this.id) {
      this.recipesService.addRecipe(this.mainForm.value);
    }
    this.recipesService.editRecipe(this.mainForm.value, this.id - 1);
    this.onCancel();
  }
}
