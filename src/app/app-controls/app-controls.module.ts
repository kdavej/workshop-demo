import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from './components/side-panel/side-panel.component';



@NgModule({
  declarations: [
    SidePanelComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SidePanelComponent,
  ]
})
export class AppControlsModule { }
