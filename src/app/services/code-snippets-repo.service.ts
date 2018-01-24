import { Injectable } from '@angular/core';
import { CodeSnippetEnum, CodeSnippet } from '../../model/code-snippet';
import { environment } from '../../environments/environment';

@Injectable()
export class CodeSnippetsRepoService {

  private snippets;
//&#9;
  private createSessionCodeSample =
                '<span class="tr"><span class="th"></span><code>  const response = await</code></span>' +
                '<span class="tr"><span class="th"></span><code>    this.http.post(' + `'/api/dde/session'` + '</code></span>' +
                '<span class="tr"><span class="th"></span><code>    options).toPromise();</code></span>' +
                '<span class="tr"><span class="th"></span><code></code></span>' +
                '<span class="tr"><span class="th"></span><code>  this.session.code =</code></span>' +
                '<span class="tr"><span class="th"></span><code>    response.json().sessionCode;</code></span>' +
                '<span class="tr"><span class="th"></span><code></code></span>' +
                '<span class="tr"><span class="th"></span><code>  this.session.id =</code></span>' +
                '<span class="tr"><span class="th"></span><code>    response.json().sessionId;</code></span>'

  private createAndInitApiFrameworkCodeSample =
                '<span class="tr"><span class="th"></span><code>  this.api = new CognosApi({</code></span>' +
                '<span class="tr"><span class="th"></span><code>    cognosRootURL: ' + `'` + environment.cognos_root_url + `',` + '</code></span>' +
                '<span class="tr"><span class="th"></span><code>    sessionCode: this.session.code,</code></span>' +
                '<span class="tr"><span class="th"></span><code>    node:</code></span>' +
                '<span class="tr"><span class="th"></span><code>      document.getElementById(' + `'containerDivId3'` + ')</code></span>' +
                '<span class="tr"><span class="th"></span><code>  });</code></span>' +
                '<span class="tr"><span class="th"></span><code></code></span>' +
                '<span class="tr"><span class="th"></span><code>  await this.api.initialize();</code></span>'
  private createDashboardCodeSample =
                '<span class="tr"><span class="th"></span><code>  this.dashboardAPI = </code></span>' +
                '<span class="tr"><span class="th"></span><code>    await this.api.dashboard.createNew();</code></span>'

  private openDashboardCodeSample =
                '<span class="tr"><span class="th"></span><code>  hi there, this is the open dashboard code;</code></span>'

  private addCSVSourceCodeSample =
                '<span class="tr"><span class="th"></span><code>  this.dashboardAPI.addSources([{</code></span>' +
                '<span class="tr"><span class="th"></span><code>    module: csv_sample_module,</code></span>' +
                '<span class="tr"><span class="th"></span><code>    name:' + `'Test CSV Source'` + ',</code></span>' +
                '<span class="tr"><span class="th"></span><code>    id:' + `'myUniqueId789'` + '</code></span>' +
                '<span class="tr"><span class="th"></span><code>  });</code></span>'


  // private addDBSSourceCodeSample =
  //               '<span class="tr"><span class="th"></span><code>  this.dashboardAPI.addSources([{</code></span>' +
  //               '<span class="tr"><span class="th"></span><code>    module: db2_sample_module,</code></span>' +
  //               '<span class="tr"><span class="th"></span><code>    name:' + `'Test DB2 Source'` + ',</code></span>' +
  //               '<span class="tr"><span class="th"></span><code>    id:' + `'myUniqueId123'` + '</code></span>' +
  //               '<span class="tr"><span class="th"></span><code>  });</code></span>'
  //
  // private addProtectedDB2SourceCodeSample =
  //               '<span class="tr"><span class="th"></span><code>  var protectedSampleModule =</code></span>' +
  //               '<span class="tr"><span class="th"></span><code>    this.getProtectedSampleModule(</code></span>' +
  //               '<span class="tr"><span class="th"></span><code>      this.db2_sample_module);</code></span>' +
  //               '<span class="tr"><span class="th"></span><code></code></span>' +
  //               '<span class="tr"><span class="th"></span><code>  this.dashboardAPI.addSources([{</code></span>' +
  //               '<span class="tr"><span class="th"></span><code>    module: protectedSampleModule,</code></span>' +
  //               '<span class="tr"><span class="th"></span><code>    name:' + `'Protected DB2 Source'` + ',</code></span>' +
  //               '<span class="tr"><span class="th"></span><code>    id:' + `'myUniqueId456'` + '</code></span>' +
  //               '<span class="tr"><span class="th"></span><code>  });</code></span>'


  private addProtectedCSVSourceCodeSample =
                '<span class="tr"><span class="th"></span><code>  var protectedSampleModule =</code></span>' +
                '<span class="tr"><span class="th"></span><code>    this.getProtectedSampleModule(</code></span>' +
                '<span class="tr"><span class="th"></span><code>      this.csv_sample_module);</code></span>' +
                '<span class="tr"><span class="th"></span><code></code></span>' +
                '<span class="tr"><span class="th"></span><code>  this.dashboardAPI.addSources([{</code></span>' +
                '<span class="tr"><span class="th"></span><code>    module: protectedSampleModule,</code></span>' +
                '<span class="tr"><span class="th"></span><code>    name:' + `'Protected CSV Source'` + ',</code></span>' +
                '<span class="tr"><span class="th"></span><code>    id:' + `'myUniqueId987'` + '</code></span>' +
                '<span class="tr"><span class="th"></span><code>  });</code></span>'

  private addCSVSourceCodeSample2 =
              '<span class="tr"><span class="th"></span><code>  this.dashboardAPI.addSources([{</code></span>' +
               '<span class="tr"><span class="th"></span><code>    module: csv_sample_module2,</code></span>' +
               '<span class="tr"><span class="th"></span><code>    name:' + `'Test CSV2 Source'` + ',</code></span>' +
               '<span class="tr"><span class="th"></span><code>    id:' + `'myUniqueId111'` + '</code></span>' +
               '<span class="tr"><span class="th"></span><code>  });</code></span>'

  private addBikeShareWeatherCSVSourceCodeSample =
              '<span class="tr"><span class="th"></span><code>  this.dashboardAPI.addSources([{</code></span>' +
               '<span class="tr"><span class="th"></span><code>    module: bike_share_weather_csv_sample_module,</code></span>' +
               '<span class="tr"><span class="th"></span><code>    name:' + `'Test Bike Share Weather Source'` + ',</code></span>' +
               '<span class="tr"><span class="th"></span><code>    id:' + `'myUniqueId222'` + '</code></span>' +
               '<span class="tr"><span class="th"></span><code>  });</code></span>'

  private setDashboardModeEditCodeSample =
                '<span class="tr"><span class="th"></span><code>  this.dashboardAPI.setMode(</code></span>' +
                '<span class="tr"><span class="th"></span><code>    this.dashboardAPI.MODES.EDIT);</code></span>'

  private setDashboardModeViewCodeSample =
                '<span class="tr"><span class="th"></span><code>  this.dashboardAPI.setMode(</code></span>' +
                '<span class="tr"><span class="th"></span><code>    this.dashboardAPI.MODES.VIEW);</code></span>'

  private setDashboardModeEditGroupCodeSample =
                '<span class="tr"><span class="th"></span><code>  this.dashboardAPI.setMode(</code></span>' +
                '<span class="tr"><span class="th"></span><code>    this.dashboardAPI.MODES.EDIT_GROUP);</code></span>'

  private undoLastActionCodeSample =
                '<span class="tr"><span class="th"></span><code>  this.dashboardAPI.undo();</code></span>'

  private redoLastActionCodeSample =
                '<span class="tr"><span class="th"></span><code>  this.dashboardAPI.redo();</code></span>'

  constructor() {
    this.snippets = new Map<string, CodeSnippet>();

    // Add snippets as key-value pairs
    this.snippets.set(CodeSnippetEnum.CreateSession, new CodeSnippet(CodeSnippetEnum.CreateSession, this.createSessionCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.CreateAPIFramework, new CodeSnippet(CodeSnippetEnum.CreateAPIFramework, this.createAndInitApiFrameworkCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.CreateDashboard, new CodeSnippet(CodeSnippetEnum.CreateDashboard, this.createDashboardCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.OpenDashboard, new CodeSnippet(CodeSnippetEnum.OpenDashboard, this.openDashboardCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.AddCSVSource, new CodeSnippet(CodeSnippetEnum.AddCSVSource, this.addCSVSourceCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.AddProtectedCSVSource, new CodeSnippet(CodeSnippetEnum.AddProtectedCSVSource, this.addProtectedCSVSourceCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.AddCSVSource2, new CodeSnippet(CodeSnippetEnum.AddCSVSource2, this.addCSVSourceCodeSample2, 'small'));
    this.snippets.set(CodeSnippetEnum.AddBikeShareWeatherCSVSource, new CodeSnippet(CodeSnippetEnum.AddBikeShareWeatherCSVSource, this.addBikeShareWeatherCSVSourceCodeSample, 'small'));
    //this.snippets.set(CodeSnippetEnum.AddDB2Source, new CodeSnippet(CodeSnippetEnum.AddDB2Source, this.addDB2SourceCodeSample, 'small'));
    //this.snippets.set(CodeSnippetEnum.AddProtectedDB2Source, new CodeSnippet(CodeSnippetEnum.AddProtectedDB2Source, this.addProtectedDB2SourceCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.DashboardEditMode, new CodeSnippet(CodeSnippetEnum.DashboardEditMode, this.setDashboardModeEditCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.DashboardViewMode, new CodeSnippet(CodeSnippetEnum.DashboardViewMode, this.setDashboardModeViewCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.DashboardEditGroupMode, new CodeSnippet(CodeSnippetEnum.DashboardEditGroupMode, this.setDashboardModeEditGroupCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.UndoLastAction, new CodeSnippet(CodeSnippetEnum.UndoLastAction, this.undoLastActionCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.RedoLastAction, new CodeSnippet(CodeSnippetEnum.RedoLastAction, this.redoLastActionCodeSample, 'large'));
  }

  getSnippet(name) : CodeSnippet {
    return this.snippets.get(name);
  }
}
