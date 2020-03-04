import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  showText(text:string, password:string)
  {
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

  ngOnInit() {
  }

}
