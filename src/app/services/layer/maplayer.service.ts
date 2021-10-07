import { Injectable } from '@angular/core';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { ILayerData } from 'src/app/models/esriapi/layerdata';
import { FEATURESERVERENDPOINT } from 'src/config/service.constants';
import { MapService } from '../map/map.service';
import { FeatureserverdataService } from '../portal/featureserverdata.service';
import Map from "@arcgis/core/Map";
import Layer from "@arcgis/core/layers/Layer"

@Injectable({
  providedIn: 'root'
})
export class MaplayerService {

  constructor(private mapService: MapService,
              private featureServerData: FeatureserverdataService) { }

  public addLayerToMap(layerData: ILayerData): void {
    if(this.mapService.map.layers && this.getMapLayerById(this.mapService.map, layerData.id)) {
      this.updateLayerVisibility(this.mapService.map, layerData.id, true);
      return;
    }

    const newLayer: FeatureLayer = new FeatureLayer();

    newLayer.url = FEATURESERVERENDPOINT + '/' + layerData.id;

    this.mapService.map.add(newLayer);
  }

  public getMapLayerById(map: Map, layerId: string): Layer {
    const layerResult: Layer = map.layers.find((layerItem: Layer) => layerItem.id == layerId);
    return layerResult;
  }

  private updateLayerVisibility( map: Map, layerId: string, visibility: boolean): void {
    const layer: Layer = map.findLayerById(layerId);
    if (layer) {
      layer.visible = visibility;
    }
  }
}
