import { Injectable } from '@angular/core';
import * as segment from './segment';
import { environment } from '../environments/environment';
import * as resources from '../assets/resources/resources.json';


@Injectable()
export class AnalyticsService {
  public sessionId: string;

  constructor() {
  }

  async setupSegment(key: string) {
    await segment.setUp(
      {
        'segment_key' : key,
        'coremetrics' : false,
        'optimizely' : false,
        'googleAddServices': false,
        'addRoll' : false,
        'fullStory' : false,
        'autoPageView': false,
        'skipIdentify': false
      }
    );
  }

  setSession(sessionId: string) {
    this.sessionId = sessionId;
  }

  loadPage(category: string, name: string) {
    segment.page(category, name);
    //segment.page(pageName, {name: pageName, title: pageName, productTitle: (<any>resources).productTitle, categoryValue: (<any>resources).categoryValue, version: environment.version});
  }

  sendTrack(eventName: string, traits: any) {
    segment.track(eventName, traits);
  }
}
