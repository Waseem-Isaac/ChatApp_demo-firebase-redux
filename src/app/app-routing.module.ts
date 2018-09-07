import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'home' , loadChildren : "app/home/home.module#HomeModule"},
  {path: 'login' , loadChildren : "app/login/login.module#LoginModule"},
  {path: 'register' , loadChildren : "app/register/register.module#RegisterModule"},


  {path : ' ', redirectTo : "home"},
  {path : "**" , redirectTo : "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
