import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes =[
  {path: '', component: LayoutComponent, children:[]},
]

export const routedComponents: any[] = [LayoutComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }