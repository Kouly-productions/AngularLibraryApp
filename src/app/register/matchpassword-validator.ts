import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators, ValidationErrors } from '@angular/forms';

//Export class der implamentere ValidatorFN
export const matchpassword : ValidatorFn = (control: AbstractControl):ValidationErrors|null =>{
    
    //Henter password
    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');

    //Tjekker om password matcher, hvis ikke sender den fejlkode ud
    if(password && confirmPassword && password?.value != confirmPassword?.value){
        return{
            passwordmatcherror : true,
            showError(): void {
                this['toastr'].error('Your passwords does not match');
              }
        }
    }
    return null;
}