import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DocsComponent } from './docs/docs.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./services/user.service";
import {DocsService} from "./services/docs.service";
import {AuthGuardService} from "./services/auth-guard.service";
import { DocsGuardService } from './services/docs-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DocsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  providers: [UserService, DocsService, AuthGuardService, DocsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
