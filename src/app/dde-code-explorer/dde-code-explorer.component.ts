import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DdeApiService } from '../services/dde-api.service';
import { Session } from '../../model/session';
import { CodeSnippet, CodeSnippetEnum } from '../../model/code-snippet';
import { CSVDataSource, ProtectedCSVDataSource, /*DB2DataSource, ProtectedDB2DataSource,*/ BikeShareWeatherCSVSource, BikeShareRidesDemographCSVSource } from '../../model/data-source';
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
  @Output() dashboardApi: EventEmitter<string> = new EventEmitter<string>();
  @Input() codeSnippet : CodeSnippet;
  dataSources = [CSVDataSource, ProtectedCSVDataSource, /*DB2DataSource, ProtectedDB2DataSource,*/ BikeShareWeatherCSVSource, BikeShareRidesDemographCSVSource ];
  dashboardModes = [DashboardMode.EditMode, DashboardMode.ViewMode, DashboardMode.EditGroupMode];
  sampleModule : string;
  sessionObject = null;

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
    try {
      if (this.codeSnippet.selection === CodeSnippetEnum.CreateSession) {
        this.sessionObject = await this.ddeApiService.createNewSession();
        this.session.emit(this.sessionObject);
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.CreateAPIFramework) {
        this.apiId.emit(await this.ddeApiService.createAndInitApiFramework());
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.CreateDashboard) {
        this.dashboardApi.emit(await this.ddeApiService.createDashboard());
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.OpenDashboard) {
        this.dashboardApi.emit(await this.ddeApiService.openDashboard());
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddCSVSource) {
        this.ddeApiService.addCSVSampleSource();
      }
      /*
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddDB2Source) {
        this.ddeApiService.addDb2SampleSource();
      }
      */
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddProtectedCSVSource) {
        this.ddeApiService.addProtectedCSVSampleSource();
      }
      /*
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddProtectedDB2Source) {
        this.ddeApiService.addProtectedDB2SampleSource();
      }
      */
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddBikeShareRidesDemographCSVSource) {
        this.ddeApiService.addBikeShareRidesDemographCSVSampleSource();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddBikeShareWeatherCSVSource) {
        this.ddeApiService.addBikeShareWeatherCSVSampleSource();
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
      else if (this.codeSnippet.selection === CodeSnippetEnum.UndoLastAction) {
        this.ddeApiService.undoLastAction();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.RedoLastAction) {
        this.ddeApiService.redoLastAction();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.GetDashboardSpec) {
        this.ddeApiService.getDashboardSpec();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.ClearDirtyState) {
        this.ddeApiService.clearDirtyState();  
      }
    }
    catch(e) {
      console.log(e);
      this.session.emit(null);
      this.apiId.emit('');
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

  showSessionPanel() {
    return this.codeSnippet && (this.codeSnippet.selection === CodeSnippetEnum.CreateAPIFramework);
  }

  showSourcesDropDown() {
    return this.codeSnippet && (this.codeSnippet.selection === CodeSnippetEnum.AddCSVSource ||
          this.codeSnippet.selection === CodeSnippetEnum.AddProtectedCSVSource ||
          //this.codeSnippet.selection === CodeSnippetEnum.AddDB2Source ||
          //this.codeSnippet.selection === CodeSnippetEnum.AddProtectedDB2Source ||
          this.codeSnippet.selection === CodeSnippetEnum.AddBikeShareWeatherCSVSource ||
          this.codeSnippet.selection === CodeSnippetEnum.AddBikeShareRidesDemographCSVSource);
  }

  showDashboardModesDropDown() {
    return this.codeSnippet && (this.codeSnippet.selection === CodeSnippetEnum.DashboardViewMode ||
          this.codeSnippet.selection === CodeSnippetEnum.DashboardEditMode ||
          this.codeSnippet.selection === CodeSnippetEnum.DashboardEditGroupMode);
  }

}
