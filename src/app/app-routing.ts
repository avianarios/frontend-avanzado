/*import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { SigninComponent } from './views/signin/signin.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: './app-root', pathMatch: 'full' },
  { path: 'app-signin', component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }*/


/* import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/services/auth/auth.guard'; */
import { Routes } from '@angular/router';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: './views/signin/signin.module#SigninModule',
    data: { title: 'Signin' }
  },
  {
    path: 'forgot-password',
    loadChildren:
      './views/forgot-password/forgot-password.module#ForgotPasswordModule',
    data: { title: 'Forgot Password' }
  },
  {
    path: 'signup',
    loadChildren: './views/signup/signup.module#SignupModule',
    data: { title: 'Signup' }
  },

//puesto por mí
  {
    path: 'dashboard',
    loadChildren: './views/dashboard/dashboard.module#DashboardModule',
    data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' }
  },
  {
    path: 'profile',
    loadChildren: './views/profile/profile.module#ProfileModule',
    data: { title: 'Perfil', breadcrumb: 'Perfil' }
  },

  {
    path: 'profile/resumen',
    loadChildren: './views/profile/resumen/resumen.module#ResumenModule',
    data: { title: 'Perfil resumido', breadcrumb: 'Perfil resumido' }
  },

  {
    path: 'profile/personal',
    loadChildren: './views/profile/personal/personal.module#PersonalModule',
    data: { title: 'Edición de datos personales', breadcrumb: 'Edición de datos personales' }
  },

//fin puesto por mí

  {
    path: 'admin',
    //  component: AdminLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' }
      },
      {
        path: 'favorites',
        loadChildren: './views/favorites/favorites.module#FavoritesModule',
        data: { title: 'Favorites', breadcrumb: 'FAVORITES' }
      },
      {
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule',
        data: { title: 'Material', breadcrumb: 'MATERIAL' }
      },
      {
        path: 'offers',
        loadChildren: './views/offers/offers.module#OffersModule',
        data: { title: 'Offers', breadcrumb: 'Offers' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];
