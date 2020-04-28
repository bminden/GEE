import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  NewUserForm: FormGroup;
  displayEmailNotification: boolean = false;
  displayUserNotification: boolean = false;
  displayPasswordNotification: boolean = false;
  displayGoodNotification: boolean = false;
  constructor(private apiService: ApiService, private router: Router) { }
  registerUser()
  {
    let text : string = this.NewUserForm.value.username;
    let password : string = this.NewUserForm.value.username;
    let email : string = this.NewUserForm.value.username;
    this.displayEmailNotification = false;
    this.displayUserNotification = false;
    this.displayPasswordNotification= false;
    this.displayGoodNotification= false;
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
    if (this.displayEmailNotification || this.displayPasswordNotification || this.displayUserNotification)
    {
      return;
    }
    else{
    this.apiService.registerUser(text, password, email).subscribe((data)=>{
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
       this.router.navigate(['/login', { data: true }]);
     }
     
    });
  }
    
  }
  togglePasswordDisplayNotification()
  {
    this. displayPasswordNotification = !this. displayPasswordNotification
  }
  toggleUserDisplayNotification()
  {
    this. displayUserNotification = !this. displayUserNotification;
  }
  toggleEmailDisplayNotification()
  {
    this. displayEmailNotification = !this.displayEmailNotification;
  }
  ngOnInit() {
    this.NewUserForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }



}
