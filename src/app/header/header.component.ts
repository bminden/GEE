import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {SessionStorageService, SessionStorage } from 'angular-web-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /**
   * stores username 
   */  
  username: String;
  constructor(public session: SessionStorageService) { }

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
