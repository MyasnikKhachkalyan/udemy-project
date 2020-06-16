import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../../../models/user.model';
import {Router} from '@angular/router';

export interface SignUpRespModel {
  idToken: string;
  email: string;
  refreshToken:	string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject<User>(null);
  autoLogOut: any;
  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  signUp(credentials: {email: string; password: string}): Observable<SignUpRespModel> {
    return this.http.post<SignUpRespModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-IJFjW_M-_20e38oa5u6McOFtvlKSMhc',
      { ...credentials, returnSecureToken: true }).pipe(
        catchError(this.errorHandler),
        tap((data) => this.handleAuth(data))
    );
  }

  signIn(credentials: {email: string; password: string}): Observable<SignUpRespModel> {
    return this.http.post<SignUpRespModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-IJFjW_M-_20e38oa5u6McOFtvlKSMhc',
      { ...credentials, returnSecureToken: true }).pipe(
        catchError(this.errorHandler),
        tap((data) => this.handleAuth(data))
    );
  }

  autoSignIn() {
    const user = JSON.parse(localStorage.getItem('user_data'));
    if (!user) {
      return;
    }
    const intervalLeft = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
    if (intervalLeft > 0) {
      this.userData.next(new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate)));
      this.autoSignOut(intervalLeft);
      console.log(intervalLeft);
    } else {
      localStorage.removeItem('user_data');
    }
  }

  signOut() {
    this.router.navigate(['/auth']);
    this.userData.next(null);
    localStorage.removeItem('user_data');
    clearTimeout(this.autoLogOut);
    this.autoLogOut = null;
  }

  autoSignOut(interval) {
    clearTimeout(this.autoLogOut);
    this.autoLogOut = setInterval(() => {
      this.signOut();
    }, interval);
  }

  private handleAuth(resp: SignUpRespModel) {
    const user = new User(resp.email, resp.localId, resp.idToken, new Date(new Date().getTime() + +resp.expiresIn * 1000));
    this.userData.next(user);
    localStorage.setItem('user_data', JSON.stringify(user));
    this.autoSignOut(+resp.expiresIn * 1000);
    this.router.navigate(['/recipes']);
  }

  private errorHandler(errorRes: HttpErrorResponse) {
    let errorMes = 'Unknown error';
    if (!(errorRes.error && errorRes.error.error)) {
      return throwError(errorMes);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS': {
        errorMes = 'Email already exist';
        break;
      }
      case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD': {
        errorMes = 'Email or password is not correct';
      }
    }
    return throwError(errorMes);
  }
}
