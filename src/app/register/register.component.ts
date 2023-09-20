import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { matchpassword} from './matchpassword-validator'
import { ToastrModule, ToastrService } from 'ngx-toastr';
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
    this.toastr.success('Registration complete');
  }
  

  //Gemmer brugerens input i forskellige variabler, og tjekker om det er rigtigt
  ngOnInit(){
    this.reactiveFrom = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      gender: new FormControl('male'),
      country: new FormControl(null),
      hobbies: new FormControl(null)
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

  //burde sende brugerens data til databasen
  onSubmit(){
    const registrationData = this.reactiveFrom.value;

    // Make a POST request to your API's registration endpoint
    this.httpClient.post('https://localhost:7084/api/User/SignUp', registrationData).subscribe(
      (response) => {
        // Registration successful
        this.showSuccess();
      },
      (error) => {
        // Registration failed, handle the error
        console.error('Registration failed:', error);
        // You can also show an error message to the user using Toastr or another notification library.
      }
    );
  }

}