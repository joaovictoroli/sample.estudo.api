import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule  } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,    
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    CollapseModule.forRoot(),
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    BrowserModule,
    ModalModule
  ],
})
export class SharedModule {}

