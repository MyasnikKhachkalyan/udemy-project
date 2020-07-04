import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService, SignUpRespModel} from '../services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  mainForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.minLength(6), Validators.required])
  });

  isInLoginMode = false;
  isLoading = false;
  errorMessage = null;

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  switchMode() {
    this.isInLoginMode = !this.isInLoginMode;
  }

  onSubmit() {
    if (this.mainForm.invalid) {
      return;
    }
    this.isLoading = true;
    let obs: Observable<SignUpRespModel>;

    if (this.isInLoginMode) {
      obs = this.authService.signIn(this.mainForm.value);
    } else {
      obs = this.authService.signUp(this.mainForm.value);
    }

    obs.subscribe(
      (res) => {
        console.log(res);
      }, ((error) => {
        console.log(error)
        this.errorMessage = error;
        this.isLoading = false;
      })
    );
    this.mainForm.reset();
  }
}
