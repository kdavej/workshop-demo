import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutRoutingModule, routedComponents } from './layout-routing.module';
import { MaterialModule } from '../material.module';
import { MapViewerModule } from '../map-viewer/map-viewer.module';
import { AppControlsModule } from '../app-controls/app-controls.module';



@NgModule({
  declarations: [
    LayoutComponent,
    routedComponents,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutRoutingModule,
    MapViewerModule,
    AppControlsModule,
  ],
  exports: [
    routedComponents,
  ]
})
export class LayoutModule { }
