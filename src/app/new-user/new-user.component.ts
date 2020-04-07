import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  showText(text:string, password:string, email:string)
  {
    this.apiService.registerUser(text, password, email).subscribe((data)=>{
     console.log(data);
     if (data["data"] === 0)
     {
      alert("Bad account information");
     } 
     if (data["data"] === 2)
     {
      alert("Username taken");
     } 
     else{
      alert("Verified");
     }
    });
  }
  ngOnInit() {
  }



}
