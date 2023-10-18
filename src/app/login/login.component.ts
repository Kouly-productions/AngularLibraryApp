import { Component, OnInit, NgModule,Injectable} from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
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
  constructor(private http: HttpClient, public toastr: ToastrService ) { }
  GetUser(){
      const username = (<HTMLInputElement>document.getElementById('username')).value;
      const password = (<HTMLInputElement>document.getElementById('password')).value;
      const apiUrl = 'http://localhost:3000/api/login';
    
      this.http.post(apiUrl, { username , password}).subscribe(
        (response) => {
          if (response && Array.isArray(response) && response.length > 0) {
            const jsonString = JSON.stringify(response)
            const parsedJson = JSON.parse(jsonString);

            let _username = parsedJson[0]._username;
            let _password = parsedJson[0]._password;
            let userid = parsedJson[0].UserID;
            this.toastr.success('Welcome '+_username);
            (<HTMLInputElement>document.getElementById('username')).value = "";
            (<HTMLInputElement>document.getElementById('password')).value = "";
          } else {
            this.toastr.warning('Wrong Password or Username');
            (<HTMLInputElement>document.getElementById('password')).value = ""
          }


        },
        (error) => {
          console.error(error);
        }
      );
    }
}


