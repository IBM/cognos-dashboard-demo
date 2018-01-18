import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DdeApiService } from '../dde-api.service';
import { Session } from '../../model/session';
import { CodeSnippet, CodeSnippetEnum } from '../../model/code-snippet';
import { DefaultOption, CSVDataSource, DB2DataSource, ProtectedDB2DataSource, ProtectedCSVDataSource } from '../../model/data-source';
import { CodeSnippetsRepoService } from '../services/code-snippets-repo.service';
import * as DashboardMode from '../../model/dashboard-mode';

@Component({
  selector: 'dde-code-explorer',
  templateUrl: './dde-code-explorer.component.html',
  styleUrls: ['./dde-code-explorer.component.css']
})
export class DdeCodeExplorerComponent implements OnInit {

  @Output() session: EventEmitter<Session> = new EventEmitter<Session>();
  @Output() apiId: EventEmitter<string> = new EventEmitter<string>();
  @Input() codeSnippet : CodeSnippet;
  sessionTest : Session;
  dataSources = [DefaultOption, CSVDataSource, DB2DataSource, ProtectedDB2DataSource, ProtectedCSVDataSource];
  dashboardModes = [DashboardMode.EditMode, DashboardMode.ViewMode, DashboardMode.EditGroupMode];
  sampleModule : string;

  constructor(private ddeApiService: DdeApiService, private codeSnippetsRepoService: CodeSnippetsRepoService) { }

  ngOnInit() {
  }

  setExplorerDiv() {
      let classes =  {
          divsmall: this.codeSnippet && this.codeSnippet.size === 'small',
          divlarge: !this.codeSnippet || this.codeSnippet.size === 'large'
      };
      return classes;
  }

  async runCode(event) {
    if (this.codeSnippet.selection === CodeSnippetEnum.CreateSession) {
      this.sessionTest = await this.ddeApiService.createNewSession();
      this.session.emit(this.sessionTest);
    }
    else if (this.codeSnippet.selection === CodeSnippetEnum.CreateAPIFramework) {
      this.apiId.emit(await this.ddeApiService.createAndInitApiFramework());
    }
    else if (this.codeSnippet.selection === CodeSnippetEnum.CreateDashboard) {
      await this.ddeApiService.setDashboardApi();
    }
    else if (this.codeSnippet.selection === CodeSnippetEnum.AddCSVSource) {
      // TODO: simplify, ddeApiService can do the get and add in one go
      this.sampleModule = await this.ddeApiService.getCSVSampleModule();
      this.ddeApiService.addCSVSampleSource(this.sampleModule);
    }
    else if (this.codeSnippet.selection === CodeSnippetEnum.AddDB2Source) {
      // TODO: simplify, ddeApiService can do the get and add in one go
      this.sampleModule = await this.ddeApiService.getDB2SampleModule();
      this.ddeApiService.addDb2SampleSource(this.sampleModule);
    }
    else if (this.codeSnippet.selection === CodeSnippetEnum.AddProtectedDB2Source) {
      this.ddeApiService.addProtectedDB2SampleSource();
    }
    else if (this.codeSnippet.selection === CodeSnippetEnum.AddProtectedCSVSource) {
      this.ddeApiService.addProtectedCSVSampleSource();
    }
    else if (this.codeSnippet.selection === CodeSnippetEnum.DashboardEditMode) {
      this.ddeApiService.setDashboardMode_Edit();
    }
    else if (this.codeSnippet.selection === CodeSnippetEnum.DashboardViewMode) {
      this.ddeApiService.setDashboardMode_View();
    }
    else if (this.codeSnippet.selection === CodeSnippetEnum.DashboardEditGroupMode) {
      this.ddeApiService.setDashboardMode_EditGroup();
    }
  }

  onSelect(sourceValue) {
    for (var i = 0; i < this.dataSources.length; i++) {
      if (this.dataSources[i].value === sourceValue) {
        this.codeSnippet = this.codeSnippetsRepoService.getSnippet(sourceValue);
      }
    }
  }

  onSelectMode(modeValue) {
    for (var i = 0; i < this.dashboardModes.length; i++) {
      if (this.dashboardModes[i].value === modeValue) {
        this.codeSnippet = this.codeSnippetsRepoService.getSnippet(modeValue);
      }
    }
  }

  showSourcesDropDown() {
    return (this.codeSnippet.selection === CodeSnippetEnum.AddCSVSource ||
          this.codeSnippet.selection === CodeSnippetEnum.AddDB2Source ||
          this.codeSnippet.selection === CodeSnippetEnum.AddProtectedDB2Source ||
          this.codeSnippet.selection === CodeSnippetEnum.AddProtectedCSVSource);
  }

  showDashboardModesDropDown() {
    return (this.codeSnippet.selection === CodeSnippetEnum.DashboardViewMode ||
          this.codeSnippet.selection === CodeSnippetEnum.DashboardEditMode ||
          this.codeSnippet.selection === CodeSnippetEnum.DashboardEditGroupMode);
  }

}
