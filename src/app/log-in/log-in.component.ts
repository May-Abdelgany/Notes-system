import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  $messageError: string = "";
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z]+[1-9]+$/)]),
  });
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  ngOnInit(): void {
    $('#login').particleground();
  }

  login(loginForm: FormGroup) {
    $("button").html('waitting');
    this._AuthService.loginNewUser(loginForm.value).subscribe((response) => {
      if (response.message == "success") {
        localStorage.setItem('Token_user', response.token);
        this._AuthService.saveToken();
        this._Router.navigate(['home']);
      }
      else {
        this.$messageError = response.message;
      }
    });
  }


}
