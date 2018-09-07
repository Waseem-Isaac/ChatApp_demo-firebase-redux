import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
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
  this.registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    email : ['', Validators.compose([Validators.required , Validators.email])],
    password: ['', Validators.required]
  });
}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

register(){
  console.log('sdkjjj')
  this.submitted = true;
  if (this.registerForm.invalid) return;

  this.loading = true;
  console.log(this.registerForm.value)

  // this.afAuth.auth.signIn().
  this.afAuth.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
    .then((res => {
      console.log("USer Created Successfully .. ");
      console.log(res)
      this.router.navigate(['/login'])
    }))
    .catch(function(error) {
      this.loading = false;

   
    console.log(error);
 });
}


}
