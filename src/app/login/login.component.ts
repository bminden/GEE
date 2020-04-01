import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

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

  /**
   * This opens up the apiService to this component
   * @param apiService The api service is what connects the components to the backend API
   */
  constructor(private apiService: ApiService) { } 
  /**
   * This method calls the getUsers method in app.service to call the api.
   * It then updates the angular page with a yes or no value deciding if the user
   * entered in correct information or not.
   * @param text This is the username
   * @param password This is the password
   */
  showText(text:string, password:string)
  {
    // API call
    this.apiService.getUsers(text, password).subscribe((data)=>{
     console.log(data);
     if (data["data"] === 0)
     {
      alert("Bad account information");
     } 
     else{
      alert("Verified");
     }
    });
  }

  /**
   * Nothing to do on Init
   */
  ngOnInit() {
  }

}
