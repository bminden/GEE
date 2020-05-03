import { Component, OnInit, ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__ } from '@angular/core';
import { ApiService } from '../api.service';
import {SessionStorageService, SessionStorage } from 'angular-web-storage';
import { Router } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
  
})
export class ResultsComponent implements OnInit {
  ResultForm: FormGroup;
  data: any;
  public isCollapsed = false;
  //constructor() { }

   /**
   * This opens up the apiService to this component
   * @param apiService The api service is what connects the components to the backend API
   */
  constructor(private router: Router, public session: SessionStorageService, private apiService: ApiService) { } 

  parseData(){
    for(var x = 0; x < Object.keys(this.data).length; x++){
      console.log(this.data[x].author);
    }
  }

  ngOnInit() {
    this.data = this.session.get("data");
    this.collapse()
    this.ResultForm= new FormGroup({
    });
    this.parseData();
  }
  download(resource)
  {
    console.log(resource);
    this.apiService.download().subscribe((resource)=>{
      console.log(resource);
     });
  }
  collapse()
  {

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }

  /*collapse() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      }
      );
    }
  }*/
}