import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MapService } from 'src/app/services/map/map.service';
import { DEFAULTBASEMAP } from 'src/config/service.constants';

@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private mapService: MapService) { }

  public ngOnInit(): void {
    this.mapService.initializeMap(this.mapViewEl, DEFAULTBASEMAP);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
