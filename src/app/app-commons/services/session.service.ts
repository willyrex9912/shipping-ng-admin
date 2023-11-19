import {inject, Injectable, signal} from '@angular/core';
import {UserInfo} from "../../auth/models/user-info";
import {AuthService} from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private authService: AuthService = inject(AuthService);

  userInfoSignal = signal<UserInfo | undefined>(undefined);

  constructor() {
    if (this.authService.isAuthenticated()) {
      this.userInfoSignal.set(this.authService.getuserInfo());
    }
  }
}
