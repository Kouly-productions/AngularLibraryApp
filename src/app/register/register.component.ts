import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { matchpassword} from './matchpassword-validator'
import { ToastrModule, ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{
  title = 'ReactiveForm';
  reactiveFrom: FormGroup;

  //Udskriver lille besked til bruger om at registering er done
  constructor(private toastr: ToastrService) {}
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

  onSubmit(){
    console.log(this.reactiveFrom)
  }
}
