import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import {FlashMessagesService} from  'angular2-flash-messages';
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(
    private auth: AuthService, 
    private router: Router,
    private flash : FlashMessagesService
  ) {}

  ngOnInit() {}

  onLogout() {
    this.auth.logout();
    this.flash.show('You are logged out', {cssClass: 'alert alert-info'});
    this.router.navigate(['/']);
  }
}
