import { Component, OnInit, NgModule} from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = "loginPage";
  //Gemmer brugerens input i variabler
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  /*constructor(){
    this.loginForm.valueChanges.subscribe((value)=>{
      console.log(value);
    });
  }*/

  //starter forfra hvis login ikke passer
  login(){
    if(this.loginForm.invalid) return;

    alert('calling backend to login');
  }
}


