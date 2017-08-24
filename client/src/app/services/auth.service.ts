import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  registerRoute = "http://localhost:3000/authentication/register";
  loginRoute = "http://localhost:3000/authentication/login";
  checkEmailRoute = "http://localhost:3000/authentication/checkEmail/";
  checkUsernameRoute = "http://localhost:3000/authentication/checkUsername/";
  profileRoute = "http://localhost:3000/authentication/profile/";

  authToken;
  user;
  options;

  constructor(private _http: Http) {}

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        "Content-Type": "application/json",
        "authorization" : this.authToken

      })
    });
  }

  loadToken() {
    this.authToken = localStorage.getItem("token");
  }
  registerUser(user) {
    return this._http.post(this.registerRoute, user).map(res => res.json());
  }

  checkUsername(username) {
    return this._http
      .get(this.checkUsernameRoute + username)
      .map(res => res.json());
  }

  checkEmail(email) {
    return this._http.get(this.checkEmailRoute + email).map(res => res.json());
  }

  login(user) {
    return this._http.post(this.loginRoute, user).map(res => res.json());
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile (){
    this.createAuthenticationHeaders();
    return this._http.get(this.profileRoute, this.options)
    .map(res=> res.json());

  }

  loggedIn(){
    return tokenNotExpired();
  }
}
