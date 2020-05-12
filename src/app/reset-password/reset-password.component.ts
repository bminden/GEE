import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import {SessionStorageService, SessionStorage } from 'angular-web-storage';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @Input() NewAccount: boolean;
  displayNewAccountNotification = false;
  ResetForm: FormGroup;
  displayNotification: boolean = false;
  sub: any;
  toggleLoginStatus: boolean = false;
  passwordFlag: boolean = false;
  securityQuestion1: string;
  securityQuestion2: string;
  usernameFlag:boolean = false;
  usernameBadFlag:boolean = false;
  /**
   * This opens up the apiService to this component
   * @param apiService The api service is what connects the components to the backend API
   */
  constructor(private router: Router, public session: SessionStorageService, private apiService: ApiService, private activatedRoute: ActivatedRoute) { 
    this.displayNewAccountNotification = this.NewAccount;

    //alert(this.NewAccount);
  } 
  toggleBadNotification()
  {
    this.usernameBadFlag = !this.usernameBadFlag;
  }
  async getSecurityQuestions()
  {
   
     await this.apiService.getSecurityQuestions(this.ResetForm.value.username).then((data)=>{

      if (data["status"] === 500)
      {
        this.usernameBadFlag = true;
      }
      else
      {
      this.securityQuestion1 = data["security1"];
      this.securityQuestion2 = data["security2"];
      this.usernameFlag = true;
      this.usernameBadFlag = false;
      }
    });;
  }
 
  routeToLogin(text:string)
  {
      this.router.navigate([`login/` + text]);
  }
  toggleLoginStatusNotification()
  {
    this.toggleLoginStatus = !this.toggleLoginStatus;
  }
  /**
   * This method calls the getUsers method in app.service to call the api.
   * It then updates the angular page with a yes or no value deciding if the user
   * entered in correct information or not.
   * @param text This is the username
   * @param password This is the password
   */
  async checkUserInfo()
  {
    await this.apiService.changePassword(this.ResetForm.value.username, this.ResetForm.value.sec1ans,this.ResetForm.value.sec2ans,this.ResetForm.value.password).then((data)=>{
      if (data["status"] === 200)
      {
        this.routeToLogin("Good Reset");
      }
      else
      {
        this.routeToLogin("Bad Reset");
      }
    });;
  }
  toggleDisplayNotification()
  {
    this.displayNotification = !this.displayNotification;
  }
  toggleDisplayNewAccountNotification()
  {
    this.displayNewAccountNotification = !this.displayNewAccountNotification;
  }

  ngOnInit() {
    this.ResetForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      sec1ans: new FormControl(''),
      sec2ans: new FormControl(''),
      sec1: new FormControl(''),
      sec2: new FormControl('')
    });
    this.session.remove("username");
  }
}
