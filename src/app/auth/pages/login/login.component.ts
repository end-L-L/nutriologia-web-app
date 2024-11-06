import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void { }

  constructor(private router: Router) { }

  public username: string = '';
  public password: string = '';
  public type: string = 'password';
  public errors: any = {};

  login() {
    console.log('username: ', this.username);
    console.log('password: ', this.password);
  }

  public registrar() {
    this.router.navigate(['auth/register']);
  }
}
