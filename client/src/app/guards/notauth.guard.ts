import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from ".././services/auth.service";

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    if (this.auth.loggedIn()) {
        this.router.navigate(["/"]);
        return false;
    } else {
      
      return true;
    }
  }
}
