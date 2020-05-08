import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA } from '@angular/core';
import { NewUserComponent } from './new-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { By } from "@angular/platform-browser";


describe('NewUserComponent', () => {
  let component: NewUserComponent;
  let fixture: ComponentFixture<NewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      imports:[RouterTestingModule, HttpClientTestingModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/**
 * the component should have been made
 */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly make page Title', () => {
    const name = fixture.debugElement.nativeElement.querySelector('h1');
    expect(name.innerHTML).toBe('New User Sign up');
  });

  it('should make Username form', () => {
    const name = fixture.debugElement.nativeElement.querySelector("div.notification.has-background-white input[name='userName']");
    expect(name).toBeTruthy();
  });

  it('should make Email form', () => {
    const email = fixture.debugElement.nativeElement.querySelector("div.notification.has-background-white input[name='emailName']");
    expect(email).toBeTruthy();
  });

  it('should make Pw form', () => {
    const pw = fixture.debugElement.nativeElement.querySelector("div.notification.has-background-white input[name='password']");
    expect(pw).toBeTruthy();
  });

  it('should make submit button', () => {
    const btn = fixture.debugElement.nativeElement.querySelector("button.button.is-link");
    expect(btn).toBeTruthy();
  });
/**
 * test if when user clicks on submit if it calls registerUser
 */
  it('call func when submited', () => {
    spyOn(component, 'registerUser');
    fixture.detectChanges();
    const funcall = fixture.debugElement.query(By.css('button'));
    funcall.triggerEventHandler('click', null);                    
    fixture.detectChanges();
    expect(component.registerUser).toHaveBeenCalled();
  });   

});
