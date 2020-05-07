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
  SearchForm: FormGroup;
  public isCollapsed = false;
  //constructor() { }

   /**
   * This opens up the apiService to this component
   * @param apiService The api service is what connects the components to the backend API
   */
  constructor(private router: Router, public session: SessionStorageService, private apiService: ApiService) { } 


  ngOnInit() {
    this.collapse()
    this.hideFull()
  }
  download()
  {
    this.apiService.download().subscribe((data)=>{
      console.log(data);
     
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

  /**
   * This toggles pdf fullsize on and off
   */
  togglePRF(){
    var full = document.getElementById("fullSize");
    if (full.style.display === "none") {
      full.style.display = "block";
    } else {
      full.style.display = "none";
    }
  }
  /**
   * This hides the full sized pdf when the page is made
   */
  hideFull(){
    var full = document.getElementById("fullSize");
    full.style.display = "none";
  }




}