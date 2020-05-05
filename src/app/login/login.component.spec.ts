import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { By } from "@angular/platform-browser";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      imports:[RouterTestingModule, HttpClientTestingModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should correctly make Title', () => {
    const name = fixture.debugElement.nativeElement.querySelector('h3');
    expect(name.innerHTML).toBe('Login');
  });

  it('should make Username form', () => {
    const name = fixture.debugElement.nativeElement.querySelector("div.column.is-6.is-offset-3 input[name='userName']");
    expect(name).toBeTruthy();
  });

  it('should make Pw form', () => {
    const pw = fixture.debugElement.nativeElement.querySelector("div.column.is-6.is-offset-3 input[name='password']");
    expect(pw).toBeTruthy();
  });

  it('should make submit button', () => {
    const btn = fixture.debugElement.nativeElement.querySelector("button.is-link.large.is-fullwidth");
    expect(btn).toBeTruthy();
  });

  it('call func when submited', () => {
    spyOn(component, 'checkUserInfo');
    fixture.detectChanges();
    const funcall = fixture.debugElement.query(By.css('button'));
    funcall.triggerEventHandler('click', null);                    
    fixture.detectChanges();
    expect(component.checkUserInfo).toHaveBeenCalled();
  });  





});
