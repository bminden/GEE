import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
UploadForm: FormGroup
//const URL = '198.211.98.83:3002/api/upload?file';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { unwrapResolvedMetadata } from '@angular/compiler';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import {SessionStorageService, SessionStorage } from 'angular-web-storage';

const URL = '198.211.98.83:3002/api/upload';

@Component({
  selector: 'app-uploadpage',
  templateUrl: './uploadpage.component.html',
  styleUrls: ['./uploadpage.component.css']
})
export class UploadpageComponent implements OnInit {



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
  UploadForm: FormGroup;
  fileToUpload: File = null;
  fileSuccessfulFlag: boolean = false;
  errorString: string = null;
  faUpload = faUpload;
  toggleErrorNotification: boolean = false;
  constructor (private apiService: ApiService, public session: SessionStorageService){}
  

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    //this.uploadFileToActivity()
}

  toggleErrorMessageNotification()
  {
    this.toggleErrorNotification = !this.toggleErrorNotification;
  }
  onSubmitFileClick()
  {
    this.errorString = "";
    if (!this.UploadForm.valid)
    {
      this.errorString = "The following required fields have not been filled out:\n";
      
      if (!this.UploadForm.controls.filename.valid)
      {
        this.errorString += "File Title ";
      }
      if (!this.UploadForm.controls.tags.valid)
      {
        this.errorString += "Tags ";
      }
      if (!this.UploadForm.controls.subject.valid)
      {
        this.errorString += "Subject ";
      } 
      if (!this.UploadForm.controls.description.valid)
      {
        this.errorString += "Description ";
      } 
      if (!this.UploadForm.controls.license.valid)
      {
        this.errorString += "License ";
      }
      if (!this.UploadForm.controls.grade.valid)
      {
        this.errorString += "Grade ";
      }
      if (!this.UploadForm.controls.tos.valid)
      {
        this.errorString += "Terms of Service and Privacy Policy";
      }
      this.toggleErrorNotification= true;
      return;
    }
    
    this.apiService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
        if (data["success"] == 0)
        {
          let username: string = this.session.get("username");
          alert(username);
          let filename: string = this.correctFileNameForLinux(this.UploadForm.value.filename);
          let subject: string = this.UploadForm.value.subject;
          let includes_worksheets: string = this.UploadForm.value.includes_worksheets;
          let includes_labs: string = this.UploadForm.value.includes_labs;
          let includes_assesment: string = this.UploadForm.value.includes_assesment;
          let includes_video: string = this.UploadForm.value.includes_video;
          let description: string = this.UploadForm.value.description;
          let license: string = this.UploadForm.value.license;
          let grade: string = this.UploadForm.value.grade;
          let tags: string = this.UploadForm.value.tags;
          this.uploaderData(username,filename, subject, grade, includes_worksheets, includes_labs, includes_assesment, includes_video, description, license, tags );
        }
        else if (data["success"] = 1)
        {
          this.errorString = "File name already taken, please choose a different file name.";
          this.toggleErrorNotification= true;
        }
        else // Unknown error
        {
          this.errorString = "Terms of Service and Privacy Policy";
          this.toggleErrorNotification= true;
        }
      }, error => {
        console.log(error);
        
      });
  }
  uploaderData(username:string, fileTitle:string, subject:string, gradeLevel:string, worksheets:string, labs:string, exams:string, video:string, description:string, license:string, tags:string){
    this.apiService.upload(username, fileTitle, subject, gradeLevel, license, worksheets, labs, video, exams, description, tags).subscribe((data)=>{
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
  
  correctFileNameForLinux(new_dir_title: string)
  {
    let new_file_name:string = "";
    for (var i = 0; i< new_dir_title.length; i++)
    {
      let c = new_dir_title.charAt(i);

      if (c == ' ' || c == '/' || c == '>' || c == '<' || c == '|' || c == ':' || c == '&' || c == '?' || c == '"')
      {
        new_file_name += "_";
      }
      else
      {
        new_file_name += c;
      }
    }

    return new_file_name;
  }

  ngOnInit() {
    
     this.UploadForm = new FormGroup({
      filename: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      includes_worksheets: new FormControl(''),
      includes_labs: new FormControl(''),
      includes_assesment: new FormControl(''),
      includes_video: new FormControl(''),
      description: new FormControl('', [Validators.required]),
      license: new FormControl('', [Validators.required]),
      grade: new FormControl('', [Validators.required]),
      tos: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required])
    });
  }

}
