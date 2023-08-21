import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterInputComponent } from './_forms/text-input/register-input/register-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './_modules/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostsComponent } from './posts/posts/posts.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PostCardComponent } from './posts/post-card/post-card.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    HomeComponent,
    RegisterInputComponent,
    PostsComponent,
    PostCardComponent,
    PostDetailComponent,
    AddPostComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CollapseModule,
    FontAwesomeModule,
    ModalModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
