import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes :Routes = [
  {path:'', component: HomeComponent},
  {path:'dashboard', component: DasboardComponent},
  {path:'register', component: RegisterComponent},
  {path:'**', component: HomeComponent},
]

@NgModule({
    declarations: [],
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [],
    exports:[RouterModule]
  })
  export class AppRoutingModule { }
  