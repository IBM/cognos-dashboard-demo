import { Injectable } from '@angular/core';
import * as segment from './segment';
import { APIAndDashboardTraits } from '../interfaces/apiAndDashboardTraits';
import { DashboardInteractionTraits } from '../interfaces/dashboardInteractionTraits';
import { DocumentationTraits } from '../interfaces/documentationTraits';
import { VideoTraits } from '../interfaces/videoTraits';
import { environment } from '../environments/environment';
import * as resources from '../assets/resources/resources.json';


@Injectable()
export class AnalyticsService {
  private sessionId: string;

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
    segment.page(pageName, {name: pageName, title: pageName, productTitle: (<any>resources).productTitle, categoryValue: (<any>resources).categoryValue, version: environment.version});
  }

  trackAPIAndDashboard(eventName: string, action: string, result: string, message: string) {
    let traits: APIAndDashboardTraits = { action: action, sessionId: this.sessionId, result_value: result,
                                        message: message, productTitle: (<any>resources).productTitle, version: environment.version};

    segment.track(eventName, traits);
  }

  trackDashboardInteraction(eventName: string, action: string, result: string, message: string, dataSource: string, uiElement: string) {
    let traits: DashboardInteractionTraits

    if (dataSource !== null) {
      traits = { action: action, sessionId: this.sessionId, result_value: result, message: message, dataSource: dataSource,
                uiElement: uiElement, productTitle: (<any>resources).productTitle, version: environment.version};
    }
    else {
      traits = { action: action, sessionId: this.sessionId, result_value: result, message: message, uiElement: uiElement,
                productTitle: (<any>resources).productTitle, version: environment.version};
    }
    segment.track(eventName, traits);
  }

  trackDocumentation(document: string, url: string) {
    let traits: DocumentationTraits = { action: (<any>resources).actions.clickedHelpResource.name, sessionId: this.sessionId, targetUrl: url, document: document,
                                        productTitle: (<any>resources).productTitle, version: environment.version};
    segment.track((<any>resources).actions.clickedHelpResource.eventName, traits);
  }

  trackVideo(action: string, time: string, doNotDisplayAgain: boolean) {
    let traits: VideoTraits = {action: action, timeLength_viewed: time, doNotDisplayAgain: doNotDisplayAgain};
    segment.track((<any>resources).actions.videoClose.eventName, traits);
  }
}
