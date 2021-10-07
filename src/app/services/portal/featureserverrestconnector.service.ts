import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FORMAT } from 'src/config/service.constants';

@Injectable({
  providedIn: 'root'
})
export class FeatureserverrestconnectorService {

  constructor(private readonly httpClient: HttpClient) { }

  public getFeatureServiceMetaDataFromUri(featureServiceUri: string): Observable<any> {
    return this.httpClient.get(
      featureServiceUri + FORMAT,
      {
        observe: 'response'
      },
      )
      .pipe(
        map((httpResponse: HttpResponse<any>) => httpResponse.body)
      );
 }
}
