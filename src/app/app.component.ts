import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  localStorage = localStorage;

  constructor(private router: Router) {
  }
  showLogin() {
    this.router.navigate(['/login']);
  }

  logout(){
    localStorage.removeItem('token');
  }
}
