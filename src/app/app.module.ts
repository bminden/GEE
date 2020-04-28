import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UploadpageComponent } from './uploadpage/uploadpage.component';
import { UserpageComponent } from './userpage/userpage.component';
import { ResultsComponent } from './results/results.component';
import { NewUserComponent } from './new-user/new-user.component';

import { AngularWebStorageModule } from 'angular-web-storage';
import { PdfViewerModule } from 'ng2-pdf-viewer';


const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'search', component: SearchComponent},
  {path: 'login', component: LoginComponent},
  {path: 'uploadpage', component: UploadpageComponent},
  {path: 'userpage', component: UserpageComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'newUser', component: NewUserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FooterComponent,
    HomepageComponent,
    HeaderComponent,
    LoginComponent,
    UploadpageComponent,
    UserpageComponent,
    ResultsComponent,
    NewUserComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AngularWebStorageModule,
    HttpClientModule,
    PdfViewerModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }),
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
