import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit(x: NgForm) {
    console.log(x);
    console.log(this.user.email + ' ' + this.user.password);

    const randomNumber = Math.random();
    this.router.navigate([randomNumber]).then(error => console.log(error));
  }
}
