import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { routedComponents } from './layout-routing.module';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    LayoutComponent,
    routedComponents
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MaterialModule,
  ],
  exports: [
    routedComponents
  ]
})
export class LayoutModule { }
