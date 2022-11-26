import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  login = '';
  password = '';

  constructor() {}

  onSubmit() {
    console.log(this.login + ' ' + this.password);
  }
}
