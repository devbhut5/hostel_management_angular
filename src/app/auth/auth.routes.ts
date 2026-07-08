import { Routes } from "@angular/router";

export const AuthRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(c => c.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/registration/registration').then((c) => c.Registration)
    }
]