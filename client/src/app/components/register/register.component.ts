import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  processing = false;
  message :String;
  messageClass : String;
  emailValid = false; 
  emailMessage : String;
  usernameValid = false;
  usernameMessage : String;

  constructor(
    private fb: FormBuilder,
    private auth : AuthService,
    private router : Router
  ) {
    this.createForm();
  }

  ngOnInit() {}
  createForm() {
    this.registerForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(30)
        ]
      ],
      username: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          this.validateUsername
        ]
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8), 
          Validators.maxLength(35),
          this.validatePassword
        ]
      ],
      password2: ["", [Validators.required]]
    },{validator: this.matchingPasswords('password','password2')});
  }
    disableForm(){
      this.registerForm.controls['email'].disable();
      this.registerForm.controls['username'].disable();
      this.registerForm.controls['password'].disable();
      this.registerForm.controls['password2'].disable();
    }
    enableForm(){

      this.registerForm.controls['email'].enable();
      this.registerForm.controls['username'].enable();
      this.registerForm.controls['password'].enable();
      this.registerForm.controls['password2'].enable();

    }
  onSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      email : this.registerForm.get('email').value,
      username : this.registerForm.get('username').value,
      password : this.registerForm.get('password').value
    }
    this.auth.registerUser(user).subscribe(data =>{
      this.messageClass = 'alert alert-success';
      this.message = 'Registration successful';
      setTimeout( ()=>{
        this.router.navigate(['/login']);
      },2000)
    }, error => {
      this.enableForm();
      this.messageClass = 'alert alert-danger';
      this.message = 'Username or email already exists';
    })
  }
  validateUsername(controls) {
    const regex = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regex.test(controls.value)) {
      return null;
    } else {
      return { validateUsername: true };
    }
  }

  validatePassword(controls) {
    const regex = new RegExp(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/
    );
    if (regex.test(controls.value)) {
      return null;
    } else {
      return { validatePassword: true };
    }
  }

  matchingPasswords(password, password2){
   return (group : FormGroup) => {
     if( group.controls[password].value === group.controls[password2].value){
       return null;
     }else{
         return {"matchingPasswords":true}
     }
   }
  }


  checkEmail(){
    const email = this.registerForm.get('email').value;
    this.auth.checkEmail(email).subscribe(data =>{
      if(!data.success){
        this.emailValid = false;
        this.emailMessage = data.message;

      }else{
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    })
  }

  checkUsername(){
    const username = this.registerForm.get('username').value;
    this.auth.checkUsername(username).subscribe(data =>{
      if(!data.success){
        this.usernameValid = false;
        this.usernameMessage = data.message;
      }else{
        this.usernameValid = true;
        this.usernameMessage = data.message;
      }
    })
  }

  get email() {
    return this.registerForm.get("email");
  }

  get username() {
    return this.registerForm.get("username");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get password2() {
    return this.registerForm.get("password2");
  }
}
