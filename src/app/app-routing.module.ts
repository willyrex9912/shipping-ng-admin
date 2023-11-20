import { NgModule } from '@angular/core';
import {mapToCanActivate, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {NotFoundComponent} from "./app-commons/components/not-found/not-found.component";
import {ManagerHomepageComponent} from "./app-commons/components/manager-homepage.component";
import {UserHomepageComponent} from "./views/user-homepage/user-homepage.component";
import {AccessGuard} from "./auth/access-guard";

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: ManagerHomepageComponent},
  { path: 'home', component: HomeComponent },
  { path: 'userhome', component: UserHomepageComponent },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'administration',
    canActivate: mapToCanActivate([AccessGuard]),
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
