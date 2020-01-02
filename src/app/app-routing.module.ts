import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OptionsPageComponent, RobotPageComponent } from 'src/app/pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/options',
    pathMatch: 'full'
  },
  {
    path: 'options',
    component: OptionsPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'robot',
    component: RobotPageComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
