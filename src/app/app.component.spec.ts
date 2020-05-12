import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import {Location} from "@angular/common";
import {Router} from "@angular/router";
import { By } from "@angular/platform-browser";

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, FooterComponent, HeaderComponent 
      ],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router); 
    location = TestBed.get(Location); 
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'GEE'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('GEE');
  });



});
