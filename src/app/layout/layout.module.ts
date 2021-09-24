import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutRoutingModule, routedComponents } from './layout-routing.module';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    LayoutComponent,
    routedComponents
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutRoutingModule,
  ],
  exports: [
    routedComponents,
  ]
})
export class LayoutModule { }
