import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user = {
    email: '',
    password: '',
  };

  constructor() {}

  onSubmit(x: NgForm) {
    console.log(x);
    console.log(this.user.email + ' ' + this.user.password);
  }
}
