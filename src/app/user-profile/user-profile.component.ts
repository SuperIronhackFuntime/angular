import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  formInfo: any = {username: '', password: '', email: ''};

  user: any;

  error: string;

  constructor( private myService: AuthService, private myRouter: Router ) { }



  ngOnInit() {
    this.myService.isLoggedIn()
    .toPromise()
    .then( () => {
      console.log(this.myService.currentUser._body);
      this.user = JSON.parse(this.myService.currentUser._body);
      // console.log('User from profile component: ', JSON.parse(this.myService.currentUser._body))
    })
    .catch( err => {
      console.log('error while accessing unothorized stuff: ', err);
      this.myRouter.navigate(['/']);
    });
  }

  logout() {
    this.myService.logout()
    .subscribe(
      () => {
        this.user = null;
        this.formInfo = {};
        this.myRouter.navigate(['/']);
      },
      (err) => this.error = err
    );
  } // end logout


}
