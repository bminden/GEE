import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  searcher(keywords:string, subject:string, gradeLevel:string, contentType:string, worksheets:string, labs:string, exams:string){
    var includes = worksheets.concat(", ", labs, ", ", exams);
    this.apiService.search(keywords, subject, gradeLevel, contentType, includes).subscribe((data)=>{
     console.log(data);
     if (data["data"] === 0)
     {
      alert("Bad News");
     } 
     else{
      alert("Verified");
     }
  });}

  ngOnInit() {
  }

}
