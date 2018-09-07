import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from './shared/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private ngRedux: NgRedux<AppState>){

  }
 
}
