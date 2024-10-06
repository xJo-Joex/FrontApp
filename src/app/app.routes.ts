import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PayComponent } from './pages/pay/pay.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'signup', component: SignupComponent
    },

    {
        path: 'pay', component: PayComponent, canActivate: [authGuard]
    }, 
    {
        path: '**',
        redirectTo: '/login'
    }
]