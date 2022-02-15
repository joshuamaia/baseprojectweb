import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeInitialComponent } from './home-initial/home-initial.component';

const routes: Routes = [
  {
    path: '',
    component: HomeInitialComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
