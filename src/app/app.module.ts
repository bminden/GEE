import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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

import { ContactComponent } from './contact/contact.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SupportComponent } from './support/support.component';

import { AngularWebStorageModule } from 'angular-web-storage';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileUploadModule } from 'ng2-file-upload';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchAllComponent } from './search-all/search-all.component';


const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'search', component: SearchComponent},
  {path: 'login', component: LoginComponent},
  {path: 'userpage', component: UserpageComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'newUser', component: NewUserComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'copyright', component: CopyrightComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'support', component: SupportComponent},
  {path: 'uploadpage/:status', component: UploadpageComponent},
  {path: 'login/:status', component: LoginComponent},
  {path: 'searchall/:keyword', component: SearchAllComponent}
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
    NewUserComponent,
    ContactComponent,
    CopyrightComponent,
    PrivacyComponent,
    SupportComponent,
    SearchAllComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AngularWebStorageModule,
    HttpClientModule,
    PdfViewerModule,
    FileUploadModule,
    FontAwesomeModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }),
      RouterModule,
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
