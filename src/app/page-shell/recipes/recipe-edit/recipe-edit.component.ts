import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;

  constructor(private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      filter((params) => params.id),
      tap((params) => this.id = params.id)
    ).subscribe();
  }

}
