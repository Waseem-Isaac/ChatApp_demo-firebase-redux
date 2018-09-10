import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../shared/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  @select() numOfOtherMsgs;
  @select() newOtherMsgs;
  constructor(
    private ngRedux: NgRedux<AppState>,
    public afAuth: AngularFireAuth, 
    public af: AngularFireDatabase, 
    private router: Router
    ) { }

  ngOnInit() {
    // this.afAuth.authState.subscribe(
    //   (res)=>{
    //     if(res){
    //       console.log('Authenticated')
    //       this.user = res
    //     }else{
    //       console.log('not authenticatied LLLLOgin')
    //       alert('something went wrong')
    //     }
    //   },
    //   (err) => {
    //     console.log('err ' , err)
    //     alert(err)
    //   })
  }
  
  
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login'])
  }


}
