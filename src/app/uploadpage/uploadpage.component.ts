import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-uploadpage',
  templateUrl: './uploadpage.component.html',
  styleUrls: ['./uploadpage.component.css']
})
export class UploadpageComponent implements OnInit {


  constructor(private apiService: ApiService) { }
  uploader(fileTitle:string, subject:string, gradeLevel:string, contentType:string, worksheets:string, labs:string, exams:string, description:string){
    var includes = worksheets.concat(", ", labs, ", ", exams);
    this.apiService.upload(fileTitle, subject, gradeLevel, contentType, includes, description).subscribe((data)=>{
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
