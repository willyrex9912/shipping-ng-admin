import {Component, inject} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Credentials} from "../../models/credentials";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {SessionService} from "../../../app-commons/services/session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private session: SessionService = inject(SessionService);

  credentials: Credentials;

  constructor() {
    this.credentials = new Credentials();
  }

  onSummit(form: NgForm) {
    this.credentials = form.value;

    this.authService.login(this.credentials)
      .subscribe({
        next: response => {
          localStorage.setItem('token', response.value);
          this.session.userInfoSignal.set(this.authService.getUserInfo());
          console.log(this.session.userInfoSignal())
          void this.router.navigate(['/homepage']);
        },
        error: error => console.log("Error", error.error)
      });
  }
}
