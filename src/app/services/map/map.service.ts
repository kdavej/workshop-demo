import { ElementRef, Injectable } from '@angular/core';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public map: Map;
  public view: MapView;

  public mapLoadComplete$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public initializeMap(mapContainerElement: ElementRef, basemapType: string): void {
    
    const mapContainer: any = mapContainerElement.nativeElement;

    if(!mapContainer) { return; }

    const map = new Map({
      basemap: basemapType,
    });
    
    const view = new MapView({
      container: mapContainer,
      map: map,
    });

    this.map = map;
    this.view = view;

    this.mapLoadComplete$.next(true);
  }
}
