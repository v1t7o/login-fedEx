import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  CustomValidators } from '../custom-validator-pasword';
import { LoginService } from '../login.service';
import { userDto } from '../models/user-dto/user-dto.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public singUpForm: FormGroup;
  /* public singUpForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl((''),[Validators.required, Validators.minLength(8)]),
    confirmPasword: new FormControl('', Validators.required,),
  }); */
  public submitted = false;
  public success = '';
  /* public email = new FormControl();
  public firstName = new FormControl() */
  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.singUpForm = this.createForm();
  }

  ngOnInit(): void {
  }
  createForm(): FormGroup{
    return this.fb.group(
      {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        mail: [null, Validators.compose([
          Validators.email,
          Validators.required
        ])],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])],
      },
      {

        validator: CustomValidators.passwordMatchValidator,
      }
    )
  }

  get formValid(){
    return this.singUpForm.controls.valid ? true : false
  }

  public save(){
    let user = {} as userDto;
    user.firstName = this.singUpForm.controls['firstName'].value;
    user.lastName = this.singUpForm.controls['lastName'].value;
    user.email = this.singUpForm.controls['mail'].value;
    this.loginService.sendUser(user).subscribe(data => console.log(data))
    console.log(this.singUpForm.value)
  }
}
