import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA } from '@angular/core';
import { UploadpageComponent } from './uploadpage.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {Location} from "@angular/common";
import {Router} from "@angular/router";
import { By } from "@angular/platform-browser";

describe('UploadpageComponent', () => {
  let component: UploadpageComponent;
  let fixture: ComponentFixture<UploadpageComponent>;

  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadpageComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      imports:[RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
    
  }));

  

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router); 
    location = TestBed.get(Location); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('navigate to "" redirects you to /home', fakeAsync(() => { 
    router.navigate(['']); 
    tick(); 
    expect(location.path()).toBe('/'); 
  }));

  it('call func: onSubmitFileClick when submited', () => {
    spyOn(component, 'onSubmitFileClick');
    fixture.detectChanges();
    const funcall = fixture.debugElement.query(By.css('button.button.has-background-link.has-text-white'));
    funcall.triggerEventHandler('click', null);                    
    fixture.detectChanges();
    expect(component.onSubmitFileClick).toHaveBeenCalled();
  });  

});
