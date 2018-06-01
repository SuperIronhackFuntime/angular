import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { serviceService } from './services/service.service';
import { reviewService } from './services/review.service';


import * as $ from 'jquery';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  formInfo: any = {username: '', password: '', email: '', cart: []};

  user: any;

  error: string;

  newItem: any;

  cartId: any;

  itemsInCart: any;


constructor(
  private myService: AuthService,
  private myRouter: Router,
  private serviceservice: serviceService,
) {}





ngOnInit() {
  this.myService.isLoggedIn()
  .toPromise()
  .then( () => {
   // console.log('app component.ts ', this.myService.currentUser);
    // this.user = JSON.parse(sessionStorage.getItem('mySession'));
    // this.formInfo = this.myService.currentUser;
    // this.user = this.myService.currentUser;
    // console.log('User from profile component: ', JSON.parse(this.myService.currentUser._body))
  })
  .catch( err => {
    console.log('error while accessing unothorized stuff: ', err);
    this.myRouter.navigate(['/']);
  });
}

  // getUserCart() {
  //   this.myService.getUserCart()
  //   .subscribe((cartList) => {
  //     this.itemsInCart = cartList;
  //     console.log('==============================')
  //     // this.myRouter.navigate(['/services/userCart']);
  //     console.log("is it working?", this.itemsInCart )
  //   })
  // }

signup() {
  // console.log(this.formInfo);
  this.myService.signup(this.formInfo)
    .subscribe(
      (user) => {
        this.user = user;
        this.formInfo = {}; // clear the input
        // console.log(this.user);
        this.myRouter.navigate(['/profile']);
      },
      (err) => this.error = err
    );
}

login() {
  this.myService.login(this.formInfo)
    .subscribe(
      (user) => {
        this.user = user;
        console.log('user from login component: ', user);
        this.formInfo = {}; // clear the input
        this.myRouter.navigate(['/profile']);
      },
      (err) => this.error = err
    );
} // end login

logout() {
  console.log('logged out');
  this.myService.logout()
  .toPromise()
  .then(
    () => {
      sessionStorage.clear();
      localStorage.clear();
      this.myService.currentUser = null;
      this.user = null;
      this.formInfo = {};
      this.myRouter.navigate(['/']);
    },
    (err) => this.error = err
  );
}


}

