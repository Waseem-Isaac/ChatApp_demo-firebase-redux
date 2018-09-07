import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { ChatBoxModule } from '../chat-box/chat-box.module';
import { ChatBoxComponent } from '../chat-box/chat-box.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    ChatBoxComponent
  ]
})
export class HomeModule { }
