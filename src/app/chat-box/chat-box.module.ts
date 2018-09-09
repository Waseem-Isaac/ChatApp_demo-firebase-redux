import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { ChatBoxComponent } from './chat-box.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ChatBoxComponent, ChatSidebarComponent],
  exports : [ChatSidebarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class ChatBoxModule { }
