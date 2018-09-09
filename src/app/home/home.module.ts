import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { ChatBoxModule } from '../chat-box/chat-box.module';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { HeaderComponent } from '../core/header/header.component';
import { CoreModule } from '../core/core.module';
import { ChatSidebarComponent } from '../chat-box/chat-sidebar/chat-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    ChatBoxComponent,
    ChatSidebarComponent
  ]
})
export class HomeModule { }
