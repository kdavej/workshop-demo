import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit, OnDestroy {
  
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public ready: boolean = false;

  constructor(private mapService: MapService) { }

  public ngOnInit(): void {
    this.mapService.mapLoadComplete$
    .pipe(takeUntil(this.destroy$))
    .subscribe((mapLoaded: boolean) => {
      this.ready = mapLoaded;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
