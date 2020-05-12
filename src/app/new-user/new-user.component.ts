import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  NewUserForm: FormGroup;
  displayEmailNotification: boolean = false;
  displayUserNotification: boolean = false;
  displaySecurity1Notification: boolean = false;
  displaySecurity2Notification: boolean = false;
  displaySecurity1AnsNotification: boolean = false;
  displaySecurity2AnsNotification: boolean = false;
  displayPasswordNotification: boolean = false;
  displayGoodNotification: boolean = false;
  searchValue:string = null;
  securityQuestions:string [];
  constructor(private apiService: ApiService, private router: Router) { }

  routeToLogin()
  {
      this.router.navigate([`login/` + "Good"]);
  }
  /**
   * registers the user, checks if all fields are possibly valid info to be used for an account
   * if so sends the info the backend, backend returns 0 if bad, 2 if info is taken by another user, 
   * otherwise registers the new user and redirects them to the login page
   */
  registerUser()
  {
    let text : string = this.NewUserForm.value.username;
    let password : string = this.NewUserForm.value.password;
    let email : string = this.NewUserForm.value.email;
    let security1 : string = this.NewUserForm.value.security1;
    let security2 : string = this.NewUserForm.value.security2;
    let securty1ans : string = this.NewUserForm.value.security1ans;
    let security2ans : string = this.NewUserForm.value.security2ans;
    this.displayEmailNotification = false;
    this.displayUserNotification = false;
    this.displayPasswordNotification= false;
    this.displayGoodNotification= false;
    this.displaySecurity1AnsNotification = false;
    this.displaySecurity1Notification = false;
    this.displaySecurity2AnsNotification = false;
    this.displaySecurity2Notification = false;
    if (!this.NewUserForm.controls.email.valid)
    {
      this.displayEmailNotification = true;
    }
    if (!this.NewUserForm.controls.password.valid)
    {
      this.displayPasswordNotification = true;
    }
    if (!this.NewUserForm.controls.username.valid)
    {
      this.displayUserNotification = true;
    }
    if (!this.NewUserForm.controls.security1.valid)
    {
      this.displaySecurity1Notification = true;
    }
    if (!this.NewUserForm.controls.security1ans.valid)
    {
      this.displaySecurity1AnsNotification = true;
    }
    if (!this.NewUserForm.controls.security2.valid)
    {
      this.displaySecurity2Notification = true;
    }
    if (!this.NewUserForm.controls.security2ans.valid)
    {
      this.displaySecurity2AnsNotification = true;
    }
    if (this.displayEmailNotification || this.displayPasswordNotification || this.displayUserNotification || 
      this.displaySecurity1AnsNotification || this.displaySecurity1Notification || this.displaySecurity2Notification
      || this.displaySecurity2AnsNotification)
    {
      return;
    }
    else{
    this.apiService.registerUser(text, password, email, security1, security2, securty1ans, security2ans).subscribe((data)=>{
     console.log(data);
     if (data["data"] === 0)
     {
      alert("Bad account information");
     } 
     if (data["data"] === 2)
     {
      this.displayUserNotification = true;
     } 
     else{
       this.displayGoodNotification = true;
       this.routeToLogin();
     }
     
    });
  }
   /**
    * toggles the display notification for invalid password format
   */ 
  }
  togglePasswordDisplayNotification()
  {
    this. displayPasswordNotification = !this. displayPasswordNotification
  }
     /**
    * toggles the display notification for invalid username format
   */ 
  toggleUserDisplayNotification()
  {
    this. displayUserNotification = !this. displayUserNotification;
  }
       /**
    * toggles the display notification for invalid security answer format
   */ 
  toggleSecurity1AnsDisplayNotification()
  {
    this. displaySecurity1AnsNotification = !this.displaySecurity1AnsNotification;
  }
       /**
    * toggles the display notification for invalid security answer format
   */ 
  toggleSecurity2AnsDisplayNotification()
  {
    this. displaySecurity2AnsNotification = !this.displaySecurity2AnsNotification
  }
       /**
    * toggles the display notification for invalid security answer format
   */ 
  toggleSecurity1DisplayNotification()
  {
    this. displaySecurity1Notification = !this.displaySecurity1Notification;
  }
       /**
    * toggles the display notification for invalid security answer format
   */ 
  toggleSecurity2DisplayNotification()
  {
    this. displaySecurity2Notification = !this.displaySecurity2Notification
  }
       /**
    * toggles the display notification for invalid email format
   */ 
  toggleEmailDisplayNotification()
  {
    this. displayEmailNotification = !this.displayEmailNotification;
  }

  ngOnInit() {
    this.securityQuestions = [];
    this.securityQuestions.push("What is your favorite book?");
    this.securityQuestions.push("What is the name of the road you grew up on?");
    this.securityQuestions.push("What is your mother’s maiden name?");
    this.securityQuestions.push("What was the name of your first/current/favorite pet?");
    this.securityQuestions.push("What was the first company that you worked for?");
    this.securityQuestions.push("Where did you meet your spouse?");
    this.securityQuestions.push("Where did you go to high school/college?");
    this.securityQuestions.push("What is your favorite food?");
    this.securityQuestions.push("What city were you born in?");
    this.securityQuestions.push("Where is your favorite place to vacation?");
    this.NewUserForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      security1: new FormControl('', [Validators.required]),
      security2: new FormControl('', [Validators.required]),
      security1ans: new FormControl('', [Validators.required]),
      security2ans: new FormControl('', [Validators.required])

    });
  }



}
