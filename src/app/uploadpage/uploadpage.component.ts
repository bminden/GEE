import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl } from '@angular/forms';

UploadForm: FormGroup
@Component({
  selector: 'app-uploadpage',
  templateUrl: './uploadpage.component.html',
  styleUrls: ['./uploadpage.component.css']
})
export class UploadpageComponent implements OnInit {


  constructor(private apiService: ApiService) { }
  uploader(fileTitle:string, subject:string, gradeLevel:string, worksheets:string, labs:string, exams:string, video:string, description:string, license:string){
    var includes = worksheets.concat(", ", labs, ", ", exams, ", ", video);
    this.apiService.upload(fileTitle, subject, gradeLevel, license, includes, description).subscribe((data)=>{
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
