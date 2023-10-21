import {Component, inject} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Credentials} from "../../models/credentials";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  credentials: Credentials;

  constructor() {
    this.credentials = new Credentials();
  }

  onSummit(form: NgForm) {
    console.log(form.value);
    this.credentials = form.value;

    this.authService.login(this.credentials)
      .subscribe({
        next: response => {
          console.log("Response", response);
          localStorage.setItem('token', response.value);
          this.router.navigate(['/']);
        },
        error: error => console.log("Error", error.error)
      });
  }
}
