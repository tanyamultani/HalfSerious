import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpaceshipsComponent } from './spaceships/spaceships.component';

const routes: Routes = [
  {
    path: '',
    component: SpaceshipsComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
