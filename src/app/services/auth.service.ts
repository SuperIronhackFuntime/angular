import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  currentUser: any;


  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`http://localhost:3000/api/signup`, user, { withCredentials: true })
      .map(res => res.json())
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(`http://localhost:3000/api/login`, user, { withCredentials: true })
      .map(res => {
        this.currentUser = null;
        res.json();
      })
      .catch(this.handleError);
  }

  logout() {
    return this.http.delete(`http://localhost:3000/api/logout`, { withCredentials: true })
      .map(res => res.json())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`http://localhost:3000/api/loggedin`, { withCredentials: true })
      // .map(userFrombackend => { this.currentUser = userFrombackend, userFrombackend.json(); } )
      .map(res => {
        this.currentUser = res.json();
      })
      .catch(this.handleError);
  }

  // getUser() {
  //   return this.http.get('http://localhost:3000/api/userdata', {withCredentials: true})
  //   .map(res => res.json())
  //   .catch(this.handleError);
  // }

  getPrivateData() {
    return this.http.get(`http://localhost:3000/api/private`, { withCredentials: true })
      .map(res => res.json())
      .catch(this.handleError);
  }
}
