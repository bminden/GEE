import { Component, OnInit, ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__ } from '@angular/core';
import { ApiService } from '../api.service';
import {SessionStorageService, SessionStorage } from 'angular-web-storage';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import { faArrowUp, faArrowDown, faDownload, faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit {
  SearchAllForm: FormGroup;
  keywordString: String = null;
  fileData: any;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faDownload = faDownload;
  faComment = faComment;
  toggleComments:boolean = false;
  public isCollapsed = false;
  feedbackData:any;
  voteData:any = null;
  canUpvote:Boolean = true;
  canDownvote:Boolean = true;
  canVote:Boolean = true;
  pdfSrc:any;

  promise: Promise<any>;
  //constructor() { }

   /**
   * This opens up the apiService to this component
   * @param apiService The api service is what connects the components to the backend API
   */
  constructor(private router: Router, public session: SessionStorageService, private apiService: ApiService,private activatedRoute: ActivatedRoute) 
  { 
    this.activatedRoute.params.subscribe(params => {
      this.keywordString = params['keyword'];
      this.onLoad(this.keywordString)
      console.log(this.keywordString);
      });
  } 
onLoad(keyword:String)
{
this.getSearchItems();
this.ngOnInit();
}
 async getSearchItems()
  {
    
  await this.apiService.searchall(this.keywordString).then((data)=>{
     this.session.set("data", data);
     console.log(data);
   });
  }

getFeedbackByID(id:number)
{
  console.log("This is the file id: " + id);
  this.apiService.getFeedback(id).subscribe((data)=>{
    console.log(data);
    this.feedbackData = data;
    console.log(this.feedbackData);
   });
 
}
toggleCommentNotification()
{
  this.toggleComments = !this.toggleComments;
}
   async ngOnInit() {
    
    //this.session.set("data", data);
    //this.router.navigateByUrl("results");
   //await this.getUserVotes();
    this.collapse();
    this.hideFull();
    await this.getSearchItems();
    this.fileData = this.session.get("data");
    this.SearchAllForm = new FormGroup({
    });
    await this.getUserVotes();
  }
  download(resource)
  {
    resource = resource +".zip";
    console.log(resource);
    this.apiService.download(resource);
  }

  submitFeedbackByFileID(fileid:number, feedbackContent:string)
  {
    let username:string = this.session.get("username");
    this.apiService.submitFeedback(username, fileid, feedbackContent).subscribe((data)=>{
      console.log(data);
      this.feedbackData = data;
      console.log(this.feedbackData);
     });
  }

  async getUserVotes()
  {
    let username = this.session.get("username");
    if (!username)
    {
      // Do nothing
    }
    else
    {
      await this.apiService.getUserVotes(username).subscribe((data)=>{
        console.log("This is votes:" + data);
        this.voteData = data;
        console.log(this.voteData);
       });
    }
  }


  checkVote(fileid:number, voteValue:number)
  {
    let voteFlag: number = voteValue;
    if (this.voteData !== null)
    {    
      this.voteData.forEach(function(data){
      if (fileid === data.fileid)
      { 
        if (voteValue === data.Vote)
        {
          if (voteValue === -1)
          {
            voteFlag = 2;
          }
          else if (voteValue === 1)
          {
            voteFlag = -2;
          }
        }
        else
        {
          voteFlag = voteValue;
        }
      }
    });
  }
    return voteFlag;
  }

  upvote(fileid:number, originalVoteValue:number)
  {
    //console.log("Original value: " + originalVoteValue);
    let voteValue = this.checkVote(fileid, 1);
    this.submitVote(fileid, voteValue, originalVoteValue);
    
  }
  downvote(fileid:number, originalVoteValue:number)
  {
    //console.log("Original value: " + originalVoteValue);
    let voteValue = this.checkVote(fileid, -1);
    this.submitVote(fileid, voteValue, originalVoteValue);
    
  }
  onFileSelected(pdfLocation:any) {
    let $img: any = document.querySelector(pdfLocation);
  
    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };
  
      reader.readAsArrayBuffer($img.files[0]);
    }
  }
 async submitVote(fileid:number, voteValue:number, originalVoteValue:number)
  {
      let hasVoted:Boolean= false;
      let actualVoteValue = 0;
      let isNull:Boolean = false;
      if (voteValue === 2)
      {
        actualVoteValue = 0;
        voteValue = 1;
      }
      else if (voteValue === -2)
      {
        actualVoteValue = 0;
        voteValue = -1;
      }
      else
      {
        actualVoteValue = voteValue;
      }
      let username = this.session.get("username");
      if (this.voteData === null)
      {
        this.voteData = [];
        this.voteData.push({"userid:":1, "fileid":fileid,"Vote":actualVoteValue});
        isNull = true;
      }
      this.voteData.forEach(function(votes){
  
        if (votes.fileid == fileid)
        {
          votes.Vote = actualVoteValue;
          hasVoted = true;
        }
        console.log(votes);
      });
      if(!hasVoted)
      {
        if (!isNull)
        {
          this.voteData.push({"userid:":1, "fileid":fileid,"Vote":voteValue});
        }
      }

      this.fileData.forEach(function(file){

        if (file.fileid == fileid)
        {
          file.upvotes = originalVoteValue + voteValue;
        }
      });


      console.log(this.voteData);
      await this.apiService.submitUserVote(username, fileid, voteValue, originalVoteValue).then((data)=>{
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
