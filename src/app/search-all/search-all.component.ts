import { Component, OnInit, ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__ } from '@angular/core';
import { ApiService } from '../api.service';
import {SessionStorageService, SessionStorage } from 'angular-web-storage';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit {
  SearchAllForm: FormGroup;
  keywordString: String = null;
  data: any;
  public isCollapsed = false;
  //constructor() { }

   /**
   * This opens up the apiService to this component
   * @param apiService The api service is what connects the components to the backend API
   */
  constructor(private router: Router, public session: SessionStorageService, private apiService: ApiService,private activatedRoute: ActivatedRoute) 
  { 
    this.activatedRoute.params.subscribe(params => {
      this.keywordString = params['keyword'];
      console.log(this.keywordString);
      });
  } 

  ngOnInit() {
    
    //this.session.set("data", data);
    //this.router.navigateByUrl("results");
    this.collapse();
    this.hideFull();
    this.data = this.session.get("data");
    this.SearchAllForm = new FormGroup({
    });
    this.apiService.searchall(this.keywordString).subscribe((data)=>{
      console.log(data);
      if (data["data"] === 0)
      {
       alert("Bad News");
      } 
      else{
       this.session.set("data", data);
       console.log(this.session.get("data"));
     }
   });
  }
  download(resource)
  {
    resource = resource +".zip";
    console.log(resource);
    this.apiService.download(resource);
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
    //var full = document.getElementById("fullSize");
    //full.style.display = "none";
  }

}
