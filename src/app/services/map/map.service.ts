import { ElementRef, Injectable } from '@angular/core';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Extent from "@arcgis/core/geometry/Extent";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public map: Map;
  public view: MapView;

  public mapLoadComplete$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public mapZoom$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

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
    this.view.when(() => {
      this.mapLoadComplete$.next(true);
    }, (error: any) => {
      alert('map exploded');
      console.dir(error);
    })
    this.view.on("mouse-wheel", (eventArgs) => {
      this.mapZoom$.next(eventArgs);
    });

    
  }

  public setMapExtent(extent: Extent): void {
    try {
      const extentToGoTo = new Extent(extent);

      this.view.extent = extentToGoTo;
    } catch (err) {
      console.log(err);
    }
  }

  public attachMouseWheelHandler(): void {
    this.view.on("mouse-wheel", (eventArgs: any) => {
      this.mapZoom$.next(eventArgs);
    });
  }
}
