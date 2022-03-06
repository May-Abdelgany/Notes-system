import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

$bath_url:string="https://route-egypt-api.herokuapp.com/";
  decodeToken: any = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient) {
    if (localStorage.getItem('Token_user') != null) {
      this.saveToken();
    }
  }

  registerNewUser(registerForm: any): Observable<any> {
    return this._HttpClient.post(`${this.$bath_url}signup`, registerForm);
  }
  loginNewUser(loginForm: any): Observable<any> {
    return this._HttpClient.post(`${this.$bath_url}signin`, loginForm);
  }
  saveToken() {
    this.decodeToken.next(jwt_decode(JSON.stringify(localStorage.getItem('Token_user'))));
    console.log(this.decodeToken.getValue());
  }

}
