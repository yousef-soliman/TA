import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DocsComponent} from "./docs/docs.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuardService} from "./services/auth-guard.service";
import { DocsGuardService } from './services/docs-guard.service';


const routes: Routes = [
  {path: '', component: DocsComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [DocsGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
