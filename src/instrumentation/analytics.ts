import { Injectable } from '@angular/core';
import * as segment from './segment';
import { CommonTraits } from '../model/commonTraits';
import { DashboardInteractionTraits } from '../model/dashboardInteractionTraits';


@Injectable()
export class AnalyticsService {
  private sessionId: string;
  private sessionCode: string;
  private productTitle : string = 'DDE Demo';

  public events = {
    APIFramework: 'API Framework',
    DashboardFactory: 'Dashboard Factory',
    DashboardAPI: 'Dashboard APIs',
    SupportAPI: 'Support APIs',
    Documentation: 'Documentation'
  };

  constructor() {
  }

  setupSegment(key: string) {
    segment.setUp(
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

  setSession(sessionId: string, sessionCode: string) {
    this.sessionId = sessionId;
    this.sessionCode = sessionCode;
  }

  loadPage(pageName: string) {
    segment.page(pageName, {name: pageName, title: pageName, productTitle: this.productTitle,
                            categoryValue: pageName})
  }

  trackAPIAndDashboard(name: string, action: string, result: string, message: string) {
    let traits: CommonTraits = { action: action, sessionId: this.sessionId, sessionCode: this.sessionCode,
                                          result: result, message: message };
    segment.track(name, traits);
  }

  trackDashboardInteraction(name: string, action: string, result: string, message: string, dataSource: string, uiElement: string) {
    let traits: DashboardInteractionTraits

    if (dataSource !== null) {
      traits = { action: action, sessionId: this.sessionId, sessionCode: this.sessionCode,
                                            result: result, message: message, dataSource: dataSource, uiElement: uiElement };
    }
    else {
      traits = { action: action, sessionId: this.sessionId, sessionCode: this.sessionCode,
                                            result: result, message: message, uiElement: uiElement }
    }
    segment.track(name, traits);
  }
}
