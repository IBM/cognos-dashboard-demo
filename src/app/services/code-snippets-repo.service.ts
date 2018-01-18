import { Injectable } from '@angular/core';
import { CodeSnippetEnum, CodeSnippet } from '../../model/code-snippet';
import { environment } from '../../environments/environment';

@Injectable()
export class CodeSnippetsRepoService {

  private snippets;

  private createSessionCodeSample = 'const response = await \n' +
                      '  this.http.post(' + `'/api/dde/session'` + ', \n' +
                      '  options).toPromise(); \n\n' +
                      'this.session.code = \n' +
                      '  response.json().sessionCode; \n\n' +
                      'this.session.id = \n' +
                      '  response.json().sessionId;';
  private createAndInitApiFrameworkCodeSample = 'this.api = new CognosApi({ \n' +
                      '   cognosRootURL: ' + `'` + environment.cognos_root_url + `',` + '\n' +
                      '   sessionCode: this.session.code, \n' +
                      '   node: document.getElementById(' + `'containerDivId3'` + ') \n' +
                      '}); \n\n' +
                      'await this.api.initialize();';
  private createDashboardCodeSample = 'this.dashboardAPI = await this.api.dashboard.createNew();';
  private addCSVSourceCodeSample = 'this.dashboardAPI.addSources([{ \n' +
                          '   module: csv_sample_module, \n' +
                          '   name:' + `'Test CSV Source'` + ', \n' +
                          '   id:' + `'myUniqueId789'` + '\n' +
                        '}]);';
  private addDBSSourceCodeSample = 'this.dashboardAPI.addSources([{ \n' +
                          '   module: db2_sample_module, \n' +
                          '   name:' + `'Test DB2 Source'` + ', \n' +
                          '   id:' + `'myUniqueId123'` + '\n' +
                        '}]);';
  private addProtectedDB2SourceCodeSample = 'var protectedSampleModule = this.getProtectedSampleModule(this.db2_sample_module); \n' +
                          'this.dashboardAPI.addSources([{ \n' +
                          '   module: protectedSampleModule, \n' +
                          '   name:' + `'Protected DB2 Source'` + ', \n' +
                          '   id:' + `'myUniqueId456'` + '\n' +
                        '}]);';
  private addProtectedCSVSourceCodeSample = 'var protectedSampleModule = this.getProtectedSampleModule(this.csv_sample_module); \n' +
                          'this.dashboardAPI.addSources([{ \n' +
                          '   module: protectedSampleModule, \n' +
                          '   name:' + `'Protected CSV Source'` + ', \n' +
                          '   id:' + `'myUniqueId987'` + '\n' +
                        '}]);';
  private openDashboardCodeSample = 'hi there, this is the open dashboard code;';
  private setDashboardModeEditCodeSample = 'set Dashboard Mode Edit Code Sample';
  private setDashboardModeViewCodeSample = 'set Dashboard Mode View Code Sample';
  private setDashboardModeEditGroupCodeSample = 'set Dashboard Mode Edit Group Code Sample';

  constructor() {
    this.snippets = new Map<string, CodeSnippet>();

    // Add snippets as key-value pairs
    this.snippets.set(CodeSnippetEnum.CreateSession, new CodeSnippet(CodeSnippetEnum.CreateSession, this.createSessionCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.CreateAPIFramework, new CodeSnippet(CodeSnippetEnum.CreateAPIFramework, this.createAndInitApiFrameworkCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.CreateDashboard, new CodeSnippet(CodeSnippetEnum.CreateDashboard, this.createDashboardCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.OpenDashboard, new CodeSnippet(CodeSnippetEnum.OpenDashboard, this.openDashboardCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.AddCSVSource, new CodeSnippet(CodeSnippetEnum.AddCSVSource, this.addCSVSourceCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.AddDB2Source, new CodeSnippet(CodeSnippetEnum.AddDB2Source, this.addDBSSourceCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.AddProtectedCSVSource, new CodeSnippet(CodeSnippetEnum.AddProtectedCSVSource, this.addProtectedCSVSourceCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.AddProtectedDB2Source, new CodeSnippet(CodeSnippetEnum.AddProtectedDB2Source, this.addProtectedDB2SourceCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.DashboardEditMode, new CodeSnippet(CodeSnippetEnum.DashboardEditMode, this.setDashboardModeEditCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.DashboardViewMode, new CodeSnippet(CodeSnippetEnum.DashboardViewMode, this.setDashboardModeViewCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.DashboardEditGroupMode, new CodeSnippet(CodeSnippetEnum.DashboardEditGroupMode, this.setDashboardModeEditGroupCodeSample, 'small'));
  }

  getSnippet(name) : CodeSnippet {
    return this.snippets.get(name);
  }
}
