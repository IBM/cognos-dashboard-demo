export class CodeSnippet {
  private code_sample: string = '';

   constructor(public selection: number, public code: string, public size: string) {
   }
}

this.code_sample = 'const response = await this.http.post(' + `'/api/dde/session'` + ', \n options).toPromise(); \n\n' +
                    'this.session.code = response.json().sessionCode; \n\n' +
                    'this.session.id = response.json().sessionId;';
export const NewSessionCS = new CodeSnippet(1, this.code_sample, 'large');

this.code_sample = 'this.api = new CognosApi({ \n ' +
                    'cognosRootURL: ' + 'https://jdcluster.us-south.containers.mybluemix.net/daas/, \n' +
                    'sessionCode: this.session.code,' +
                    'node: document.getElementById(' + 'containerDivId3' + ')' +
                    '});';
export const InitAPICS = new CodeSnippet(2, this.code_sample, 'small');

this.code_sample = 'this.dashboardAPI = await this.api.dashboard.createNew();';
export const CreateDashBoardCS = new CodeSnippet(3, this.code_sample, 'large');

this.code_sample = 'const response = await this.http.get(' + `'/assets/ddeDb2SampleModule.json'` + ').toPromise();';
export const CSVSourceCS = new CodeSnippet(4, 'Add CSV dataSource', 'small');

this.code_sample = 'const response = await this.http.get(' + `'/assets/ddeDb2SampleModule.json'` + ').toPromise();';
export const DB2SourceCS = new CodeSnippet(5, this.code_sample, 'small');
