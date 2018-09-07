import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../shared/store';
import { ADD_MESSAGE } from '../shared/actions';
import { Orbstream } from '../shared/orbstream/orbstream';
//firebase
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  messages: Array<any> = [];
  @select() numOfMsgs;


  user : any;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';

  constructor(private ngRedux: NgRedux<AppState>, public afAuth: AngularFireAuth, public af: AngularFireDatabase, private router: Router) {
    this.items = af.list('/messages');
    // this.user = afAuth.authState;
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(
      (res)=>{
        if(res){
          console.log('Authenticated')
          this.user = res
        }else{
          console.log('not authenticatied LLLLOgin')
          this.router.navigate(['/login'],{replaceUrl: true})
        }
      },
      (err) => {
        console.log('err ' , err)
      })
  }


  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login'])
  }


  //
  sendMsg(msg) {
    if (!msg.value) return;

    var now = new Date()
    this.items.push({message: msg.value, userEmail : this.user.email , msgTimeHour :now.getHours() ,msgTimeMin:now.getMinutes() , msgDate: now.toDateString()  })
    msg.value = ''
    
    // this.ngRedux.dispatch({ type: ADD_MESSAGE, numOfMsgs: this.items | })
  }

}
