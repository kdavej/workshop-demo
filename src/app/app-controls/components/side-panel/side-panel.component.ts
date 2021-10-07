import { Component, OnDestroy, OnInit } from '@angular/core';
import Extent from '@arcgis/core/geometry/Extent';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ILayerData } from 'src/app/models/esriapi/layerdata';
import { MaplayerService } from 'src/app/services/layer/maplayer.service';
import { MapService } from 'src/app/services/map/map.service';
import { FeatureserverdataService } from 'src/app/services/portal/featureserverdata.service';
import { FEATURESERVERENDPOINT } from 'src/config/service.constants';

@Component({
  selector: 'side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit, OnDestroy {
  
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public ready: boolean = false;

  public extentInfo: Extent;

  public layerList: ILayerData[] | undefined;

  constructor(private mapService: MapService,
              private featureServerDataService: FeatureserverdataService,
              private mapLayerService: MaplayerService) {
  }

  public ngOnInit(): void {
    this.mapService.mapLoadComplete$
    .pipe(takeUntil(this.destroy$))
    .subscribe((mapLoaded: boolean) => {
      if(!mapLoaded) { return; }
      this.ready = true;
      this.addLayersToMap();
      this.mapService.attachMouseWheelHandler();
    });

    this.mapService.mapZoom$
    .pipe(takeUntil(this.destroy$))
    .subscribe((mouseEventArgs: any) => {
      if(!mouseEventArgs) {return;}
      this.extentInfo = this.mapService.view.extent;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private addLayersToMap(): void {
    this.featureServerDataService.loadFeatureServerMetaData(FEATURESERVERENDPOINT)
    .pipe(take(1))
    .subscribe((metaData: any) => {
      this.layerList = metaData.layers;
      this.layerList?.forEach((layerData: ILayerData) => {
        this.mapLayerService.addLayerToMap(layerData);
      });
    });
  }

}
