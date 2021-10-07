import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILayerData } from 'src/app/models/esriapi/layerdata';
import { FeatureserverrestconnectorService } from './featureserverrestconnector.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureserverdataService {

  public featureServerMetaData$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  public serverMetaDataState: any;
  public serverMetaDataSourceUri: string;

  constructor(private featureServerRestConnectorService: FeatureserverrestconnectorService) { }

  public loadFeatureServerMetaData(featureServerUri: string): Observable<any> {
    return this.featureServerRestConnectorService.getFeatureServiceMetaDataFromUri(featureServerUri)
    .pipe(
      map((serverMetaData: any) => {
        this.serverMetaDataState = serverMetaData;
        this.serverMetaDataSourceUri = featureServerUri;
        this.featureServerMetaData$.next(serverMetaData);
        return serverMetaData;
      })
    );
  }

  public getLayerData(serverMetaData: any): [{name: string, layerData: ILayerData}] | undefined
  {
    if(!serverMetaData || !serverMetaData.layers || serverMetaData.layers.length === 0) { return undefined; }
    return serverMetaData.layers.map((layer: ILayerData) => {
       return {name: layer.name, layerData: layer};
    });
  }
}
