import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../shared/store';
import { ADD_MESSAGE,  ALL_MSGS, MY_MSGS, OTHER_MSGS } from '../shared/actions';
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
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  @ViewChild('chatHistory') chatHistoryBox: ElementRef;

  messages: Array<any> = [];
  @select() numOfAllMsgs;

  user : any;
  items: any;
  msgVal: string = '';

  constructor(private ngRedux: NgRedux<AppState>, public afAuth: AngularFireAuth, public af: AngularFireDatabase, private router: Router) {
    // this.items = af.list('/messages');
    af.list('/messages').subscribe((msgs: any)=>{
      this.items = msgs;
      let myMsgs = msgs.filter((msg) => msg.userEmail === this.user.email)
      let otherMsgs = msgs.filter((msg) => msg.userEmail !== this.user.email)

      // dispatch action when messages Changes (add msg)
      this.ngRedux.dispatch({ type: ALL_MSGS, numOfAllMsgs: this.items.length})

      // dispatch action when my messages Changes (add msg)
      this.ngRedux.dispatch({ type: MY_MSGS, numOfMyMsgs: myMsgs.length})

       // dispatch action when my messages Changes (add msg)
       this.ngRedux.dispatch({ type: OTHER_MSGS, numOfOtherMsgs: otherMsgs.length })
    },(err : any) => {
      console.log("Error When get Messages")
    })

   
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


  //
  sendMsg(msg) {
    if (!msg.value) return;

    var now = new Date()
    this.af.list('messages').push(
      {
        message: msg.value, userEmail : this.user.email ,
        msgTimeHour :now.getHours() ,
        msgTimeMin:now.getMinutes() , 
        msgDate: now.toDateString()
      })
    msg.value = ''
    
    document.querySelector('.chat-history').scrollTop = document.querySelector('.chat-history').scrollHeight 

    
  }

}
