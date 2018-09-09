import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../shared/store';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css']
})
export class ChatSidebarComponent implements OnInit {

  @select() numOfAllMsgs;
  @select() numOfMyMsgs;
  constructor(private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
  }

}
