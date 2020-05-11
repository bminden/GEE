import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {SessionStorageService, SessionStorage } from 'angular-web-storage';
//import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private ZIPLOGO = ("..\\search-all\\images\\zip.png");
  /**
   * stores username 
   */  
  username: String;
  searchValue: String = null;
  constructor(public session: SessionStorageService, public router: Router) { }

  /**
   * initial get username 
   */
  ngOnInit() {
    this.username = this.session.get("username");
  }
  /**
   * check on username changes
   */
  ngDoCheck() {
    this.username = this.session.get("username");
  }
  @ViewChild('navBurger', {static: false}) navBurger: ElementRef;
  @ViewChild('navMenu', {static: false}) navMenu: ElementRef;

  routeToSearchAll()
  {
    if (this.searchValue !== null && this.searchValue != "" && this.searchValue.replace(/\s/g, '').length)
    {
      this.router.navigate([`searchall/` + this.searchValue]);
    }
  }
/**
 * toggles the navbar's fullsize for narrow dispalys
 */

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }
  /**
   * @param event The event of logging out causes the username String to be removed
   */

  handleClick(event: Event) {
    this.session.remove("username");
  }
}
