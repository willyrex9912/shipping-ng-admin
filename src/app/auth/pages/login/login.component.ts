import {Component, inject} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Credentials} from "../../models/credentials";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials: Credentials;

  constructor() {
    this.credentials = new Credentials();
  }

  onSummit(form: NgForm) {
    console.log(form.value);
  }

}
