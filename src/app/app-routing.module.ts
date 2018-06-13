import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from 'src/app/container/container.component';


const routes: Routes = [
  { path: 'Consultation', component: ContainerComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
