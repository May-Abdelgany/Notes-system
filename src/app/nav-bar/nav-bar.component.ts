import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  $islogin: boolean = false;
  constructor(private _AuthService: AuthService ,private _Router:Router) { }

  ngOnInit(): void {
    this._AuthService.decodeToken.subscribe(() => {
      if (this._AuthService.decodeToken.getValue() == null) {
        this.$islogin = false;
      }
      else {
        this.$islogin = true;
      }
    })
  }

  logout(){
    localStorage.removeItem('Token_user');
    this._AuthService.decodeToken.next(null);
    this._Router.navigate(['login']);
  }
}
