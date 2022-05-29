import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { last } from 'rxjs/operators';


export class CustomValidators {

  constructor() {}

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }
  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('confirmPassword').value;
    const firstName: string = control.get('firstName').value;
    const lastName: string = control.get('lastName').value;
    // compare is the password match
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
    if(password === firstName || password === lastName){
      control.get('password').setErrors({NoFirstOrLastName: true})
    }
  }
  /* static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  } */
}

/* export function CustomValidatorPasword(firstName?: string, lastName?: string): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {

    const value = control.value;

    if(!value){
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    let isPresent = value === firstName || value === lastName ? false : true;
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && isPresent;

    console.log(value)
    return !passwordValid ? {passwordStrength: true}: null;
  }

} */
