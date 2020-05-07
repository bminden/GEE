import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

UploadForm: FormGroup

const URL = '198.211.98.83:3002/api/upload?file';


@Component({
  selector: 'app-uploadpage',
  templateUrl: './uploadpage.component.html',
  styleUrls: ['./uploadpage.component.css']
})
export class UploadpageComponent implements OnInit {



  constructor(private apiService: ApiService) { 

  }

  
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'file'});

  /**
   * This sends metadata about the file being uplaoded to the backend so that it can be processed
   * @param fileTitle title of the file
   * @param subject the subject of the file
   * @param gradeLevel the grade level
   * @param worksheets if the document has worksheets
   * @param labs if the document has labs
   * @param exams if the document has exams 
   * @param video if the document has videos
   * @param description a discription of the file
   * @param license file uplaoder's license for the file
   * backend returns 0 if something went wrong
   */


  uploaderData(fileTitle:string, subject:string, gradeLevel:string, worksheets:string, labs:string, exams:string, video:string, description:string, license:string){
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
    });
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
  }

}
