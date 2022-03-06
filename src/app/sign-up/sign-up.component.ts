import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  $messageError: string="";
  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z]+[1-9]+$/)]),
    age: new FormControl(null, [Validators.required, Validators.min(10)]),
  });
  constructor(private _AuthService: AuthService,private _Router:Router) { }

  ngOnInit(): void {
    $('#signup').particleground();
  }

  register(registerForm: FormGroup) {
    $("button").html('waitting');
     this._AuthService.registerNewUser(registerForm.value).subscribe((response)=>
      {
       if(response.message=="success"){
          this._Router.navigate(['login']);
       }
       else{
         this.$messageError=response.errors.email.message;
       }
      });
  }

}
