import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService, SignUpRespModel} from '../services/auth.service';
import {Observable} from 'rxjs';
import {LoaderService} from '../shared/loader/loader.service';
import {finalize} from 'rxjs/operators';
import {ModalService} from '../shared/modal/modal.service';
import {AlertComponent} from '../shared/alert/alert/alert.component';

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

  constructor(private readonly authService: AuthService,
              private readonly loaderService: LoaderService,
              private readonly modalService: ModalService) { }

  ngOnInit(): void {
  }

  switchMode() {
    // this.isInLoginMode = !this.isInLoginMode;
    const modalRef = this.modalService.open<null, AlertComponent>(AlertComponent , { });

    modalRef.afterClose.subscribe(() => console.log('closed'));
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
    this.loaderService.showLoader();
    obs.pipe(
      finalize(() => this.loaderService.hideLoader())
    ).subscribe(
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
