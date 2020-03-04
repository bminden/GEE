import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  users;
  ngOnInit() {
    console.log("I WAS HERE!!");
    this.apiService.getUsers().subscribe((data)=>{
      console.log(data);
      
    });
  }
}
