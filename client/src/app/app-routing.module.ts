import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { DasboardComponent } from "./components/dasboard/dasboard.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/notauth.guard";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "dashboard", component: DasboardComponent, canActivate : [AuthGuard] },
  { path: "register", component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: "profile", component: ProfileComponent,  canActivate : [AuthGuard] },
  { path: "login", component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: "**", component: HomeComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
