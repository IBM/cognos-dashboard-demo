import { Injectable } from '@angular/core';
import * as segment from './segment';
import { environment } from '../environments/environment';

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
  }

  sendTrack(eventName: string, traits: any) {
    segment.track(eventName, traits);
  }
}
