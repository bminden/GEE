import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getUsers (usr, pwd){
    return this.httpClient.get('http://198.211.98.83:3002/users', {
      params:{
        username: usr,
        password: pwd
      }
    });
  }

  public registerUser (usr, pwd, email){
    return this.httpClient.get('http://198.211.98.83:3002/registerUser', {
      params:{
        username: usr,
        password: pwd,
        email: email
      }
    });
  }
  //public search (keywords, subject, contentType, gradeLevel){
  public search (keywords, subject, contentType, gradeLevel, includes){
    return this.httpClient.get('http://198.211.98.83:3002/search', {
      params:{
        keywords: keywords,
        subject: subject,
        contentType: contentType,
        gradeLevel: gradeLevel,
        includes: includes
      }
    });
  }

  public upload (fileTitle, subject, contentType, gradeLevel, includes, description){
    return this.httpClient.get('http://198.211.98.83:3002/upload', {
      params:{
        fileTitle: fileTitle,
        subject: subject,
        contentType: contentType,
        gradeLevel: gradeLevel,
        includes: includes,
        description: description
      }
    });
  }


}
