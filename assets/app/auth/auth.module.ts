import { NgModule } from "@angular/core";

import { LogoutComponent } from './logout.component';
import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { CommonModule } from '@angular/common';
import { authRouting } from './auth.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        LogoutComponent,
        SignupComponent,
        SigninComponent
    ],
    imports: [
        CommonModule,
        authRouting,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }