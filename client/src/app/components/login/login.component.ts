import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { AuthGuard } from "../../guards/auth.guard";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  processing = false;
  message;
  messageClass;
  previousUrl;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private authguard: AuthGuard
  ) {
    this.createForm();
  }

  ngOnInit() {
    if (this.authguard.redirectUrl) {
      this.messageClass = "alert alert-danger";
      this.message = "You must be logged in to view that page";
      this.previousUrl = this.authguard.redirectUrl;
      this.authguard.redirectUrl = undefined;
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  disableForm() {
    this.loginForm.controls["username"].disable();
    this.loginForm.controls["password"].disable();
  }
  enableForm() {
    this.loginForm.controls["username"].enable();
    this.loginForm.controls["password"].enable();
  }

  onSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      username: this.loginForm.get("username").value,
      password: this.loginForm.get("password").value
    };
    this.auth.login(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        this.auth.storeUserData(data.token, data.user);
        this.processing = true;
        this.disableForm();
        setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]);
          } else {
            this.router.navigate(["/dashboard"]);
          }
        }, 2000);
      }
    });
  }

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }
}
