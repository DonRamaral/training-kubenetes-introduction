import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export let APP_CONFIG: any;

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor(public http: HttpClient) {

  }

  public fetchAppConfig() {
    return this.http.get<any>('/assets/config/app.config.json')
      .toPromise()
      .then((config) => { APP_CONFIG = config });
  }
}
