import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, FooterComponent, HeaderComponent 
      ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
  }));

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

  //it('should render title', () => {
    //const fixture = TestBed.createComponent(AppComponent);
    //fixture.detectChanges();
    //const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('.content span').textContent).toContain('GEE app is running!');
  //});
});
