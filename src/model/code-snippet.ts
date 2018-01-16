export class CodeSnippet {
  private code_sample: string = '';

   constructor(public selection: number, public code: string, public size: string) {
   }
}

this.code_sample = 'const response = await \n' +
                    '  this.http.post(' + `'/api/dde/session'` + ', \n' +
                    '  options).toPromise(); \n\n' +
                    'this.session.code = \n' +
                    '  response.json().sessionCode; \n\n' +
                    'this.session.id = \n' +
                    '  response.json().sessionId;';
export const NewSessionCS = new CodeSnippet(1, this.code_sample, 'large');

this.code_sample = 'this.api = new CognosApi({ \n' +
                    '   cognosRootURL: ' + `'https://jdcluster.us-south.containers.mybluemix.net/daas/',` + '\n' +
                    '   sessionCode: this.session.code, \n' +
                    '   node: document.getElementById(' + `'containerDivId3'` + ') \n' +
                    '}); \n\n' +
                    'await this.api.initialize();' ;
export const InitAPICS = new CodeSnippet(2, this.code_sample, 'small');

this.code_sample = 'this.dashboardAPI = await this.api.dashboard.createNew();';
export const CreateDashBoardCS = new CodeSnippet(3, this.code_sample, 'large');

this.code_sample = 'this.dashboardAPI.addSources([{ \n' +
                        '   module: csv_sample_module, \n' +
                        '   name:' + `'Test CSV Source'` + ', \n' +
                        '   id:' + `'myUniqueId789'` + '\n' +
                      '}]);';
export const CSVSourceCS = new CodeSnippet(4, this.code_sample, 'small');

this.code_sample = 'this.dashboardAPI.addSources([{ \n' +
                        '   module: db2_sample_module, \n' +
                        '   name:' + `'Test Source'` + ', \n' +
                        '   id:' + `'myUniqueId123'` + '\n' +
                      '}]);';
export const DB2SourceCS = new CodeSnippet(5, this.code_sample, 'small');
