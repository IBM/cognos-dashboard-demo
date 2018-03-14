import { Injectable } from '@angular/core';
import * as segment from './segment';
import { APIAndDashboardTraits } from '../interfaces/apiAndDashboardTraits';
import { DashboardInteractionTraits } from '../interfaces/dashboardInteractionTraits';
import { DocumentationTraits } from '../interfaces/documentationTraits';
import { environment } from '../environments/environment';


@Injectable()
export class AnalyticsService {
  private sessionId: string;
  private productTitle : string = 'DDE Demo';
  private categoryValue : string = 'Offering Interface';

  public events = {
    APIFramework: 'API Framework',
    DashboardFactory: 'Dashboard Factory',
    DashboardAPI: 'Dashboard APIs',
    SupportAPI: 'Support APIs',
    Documentation: 'Documentation'
  };

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

  loadPage(pageName: string) {
    segment.page(pageName, {name: pageName, title: pageName, productTitle: this.productTitle, categoryValue: this.categoryValue, version: environment.version});
  }

  trackAPIAndDashboard(eventName: string, action: string, result: string, message: string) {
    let traits: APIAndDashboardTraits = { action: action, sessionId: this.sessionId, result_value: result,
                                        message: message, productTitle: this.productTitle, version: environment.version};

    segment.track(eventName, traits);
  }

  trackDashboardInteraction(eventName: string, action: string, result: string, message: string, dataSource: string, uiElement: string) {
    let traits: DashboardInteractionTraits

    if (dataSource !== null) {
      traits = { action: action, sessionId: this.sessionId, result_value: result, message: message, dataSource: dataSource,
                uiElement: uiElement, productTitle: this.productTitle, version: environment.version};
    }
    else {
      traits = { action: action, sessionId: this.sessionId, result_value: result, message: message, uiElement: uiElement,
                productTitle: this.productTitle, version: environment.version};
    }
    segment.track(eventName, traits);
  }

  trackDocumentation(document: string, url: string) {
    let traits: DocumentationTraits = { action: 'Clicked Help Resource', sessionId: this.sessionId, targetUrl: url, document: document,
                                        productTitle: this.productTitle, version: environment.version};
    segment.track(this.events.Documentation, traits);
  }
}
