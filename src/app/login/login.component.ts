import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public afAuth: AngularFireAuth, public af: AngularFireDatabase,
  ) { }

  ngOnInit() {
    this.createForm();
    // reset login status
     //this.authenticationService.logout();

  }

  createForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login(){
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.loading = true;
    console.log(this.f.email.value , this.f.password.value)

    this.afAuth.auth.signInWithEmailAndPassword(this.f.email.value , this.f.password.value).then((res => {
      console.log('Successful Login ' , res)
      this.router.navigate(['/home'])
    })).catch((err) => {
      this.loading = false;
      alert(err)
      console.log("Error " , err)
    })
    
  }

}
