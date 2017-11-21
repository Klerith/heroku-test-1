import { ErrorService } from './errors/error.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

import { MessageModule } from './messages/message.module';
import { MessageService } from './messages/message.service';

import { AppComponent } from "./app.component";

// import { MessageComponent } from './messages/message.component';
// import { MessageListComponent } from './messages/message-list.component';
// import { MessageInputComponent } from './messages/message-input.component';
// import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './shared/header.component';
import { LogoutComponent } from './auth/logout.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { AuthService } from './auth/auth.service';
import { ErrorComponent } from './errors/error.component';


@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        routing,
        HttpClientModule,
        MessageModule
    ],
    bootstrap: [AppComponent],
    providers: [
        MessageService,
        AuthService,
        ErrorService
    ]
})
export class AppModule {

}