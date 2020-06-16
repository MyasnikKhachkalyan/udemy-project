import {Component, OnInit} from '@angular/core';
import {FirebaseBackService} from '../../services/firebase-back.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-shell-header',
  templateUrl: './shell-header.component.html',
  styleUrls: ['./shell-header.component.css']
})
export class ShellHeaderComponent {
  constructor(private readonly firebaseBackService: FirebaseBackService,
              private readonly authService: AuthService) {
  }

  saveData() {
    return this.firebaseBackService.putRecipes().subscribe();
  }

  fetchData() {
    return this.firebaseBackService.getRecipes().subscribe();
  }

  logOut() {
    this.authService.signOut();
  }
}
