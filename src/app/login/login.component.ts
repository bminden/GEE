import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import {SessionStorageService, SessionStorage } from 'angular-web-storage';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * This class represents the Logic for the Login Component that controls
 * user logins.
 */
export class LoginComponent implements OnInit {
  @Input() NewAccount: boolean;
  displayNewAccountNotification = false;
  LoginForm: FormGroup;
  displayNotification: boolean = false;
  sub: any;
  /**
   * This opens up the apiService to this component
   * @param apiService The api service is what connects the components to the backend API
   */
  constructor(private route: ActivatedRoute ,private router: Router, public session: SessionStorageService, private apiService: ApiService) { 
    this.displayNewAccountNotification = this.NewAccount;
    
    //alert(this.NewAccount);
  } 
  
  /**
   * This method calls the getUsers method in app.service to call the api.
   * It then updates the angular page with a yes or no value deciding if the user
   * entered in correct information or not.
   * @param text This is the username
   * @param password This is the password
   */
  checkUserInfo()
  {
    let text: string = this.LoginForm.value.username;
    let password: string = this.LoginForm.value.password;
    // API call
    this.apiService.getUsers(text, password).subscribe((data)=>{
     console.log(data);
     if (data === null)
     {
      this.displayNotification = true;
     } 
     else
     {
      this.displayNotification = false;
      this.session.set("username", text);
      
      //this.router.navigateByUrl("home");
     }
    });
  }
  toggleDisplayNotification()
  {
    this.displayNotification = !this.displayNotification;
  }
  toggleDisplayNewAccountNotification()
  {
    this.displayNewAccountNotification = !this.displayNewAccountNotification;
  }
  /**
   * Nothing to do on Init
   */
  ngOnInit() {
    this.LoginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
    this.session.remove("username");
    this.sub = this.route
            .data
            .subscribe(value => {console.log("HERE IS THE VALUE:"); console.log(value)});
  }

}
