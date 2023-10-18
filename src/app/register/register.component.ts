import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { matchpassword} from './matchpassword-validator'
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{
  title = 'ReactiveForm';
  reactiveFrom: FormGroup;

  //Udskriver lille besked til bruger om at registering er done
  constructor(private toastr: ToastrService, private httpClient: HttpClient ) {}
  showSuccess(): void {
    this.CreateUser();
    
  }
  

  //Gemmer brugerens input i forskellige variabler, og tjekker om det er rigtigt
  ngOnInit(){
    this.reactiveFrom = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
    },
    {
      //tjekker om validators passer med matchpassword
      validators:matchpassword
    });
  }

  //skriver til consollen hvad bruger har skrevet i formen
  login(){
    console.log(this.reactiveFrom);
  }
  CreateUser(){
    const username = (<HTMLInputElement>document.getElementById('fname')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    const conPassword = (<HTMLInputElement>document.getElementById('ConfirmPassword')).value;
    const apiUrl = 'http://localhost:3001/api/register';
  
    this.httpClient.post(apiUrl, { username , password}).subscribe(
      (response:any) => {
        this.toastr.success('User created successfully');
          (<HTMLInputElement>document.getElementById('fname')).value = "";
          (<HTMLInputElement>document.getElementById('password')).value = "";
          (<HTMLInputElement>document.getElementById('ConfirmPassword')).value="";
      },
      (error) => {
        this.toastr.error('Error creating user',error);
      }
    );
  }
}