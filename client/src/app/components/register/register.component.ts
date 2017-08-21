import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
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

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);
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
   return (group:FormGroup) =>{
     if(group.controls[password].value === group.controls[password2].value){
       return null;
     }else{
         return {matchingPasswords:true}
     }
   }
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
