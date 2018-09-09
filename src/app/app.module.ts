import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux , NgReduxModule } from 'ng2-redux'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppState, INIT_STATE, rootReducer } from './shared/store';
import { HomeComponent } from './home/home.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
// FireBase
import { AngularFireModule } from 'angularfire2/angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule, NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

export const firebaseConfig = {
  apiKey: "AIzaSyBd8MPo66BtQiT5T9a65PUkJq7OSX6FoDc",
  authDomain: "orbchat-demo.firebaseapp.com",
  databaseURL: "https://orbchat-demo.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "39091243302"
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgReduxModule,

    // FireBase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [AngularFireAuth, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux : NgRedux<AppState>){
    ngRedux.configureStore(rootReducer, INIT_STATE)
  }
 }
