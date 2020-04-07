import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {SessionStorageService, SessionStorage } from 'angular-web-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: String;
  constructor(public session: SessionStorageService) { }

  ngOnInit() {
    alert("Hello " + this.session.get("username"));
    this.username = this.session.get("username");
  }
  @ViewChild('navBurger', {static: false}) navBurger: ElementRef;
  @ViewChild('navMenu', {static: false}) navMenu: ElementRef;

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }
}
