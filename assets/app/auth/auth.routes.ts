import { LogoutComponent } from './logout.component';
import { SigninComponent } from './signin.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup.component';

// import { AUTH_ROUTES } from './auth.routes';


const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'singin', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent }
];

export const authRouting = RouterModule.forChild(AUTH_ROUTES);

