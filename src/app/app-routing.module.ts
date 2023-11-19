import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {NotFoundComponent} from "./app-commons/components/not-found/not-found.component";
import {ManagerHomepageComponent} from "./app-commons/components/manager-homepage.component";

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: ManagerHomepageComponent},
  { path: 'home', component: HomeComponent },
  {
    path: 'administration',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
